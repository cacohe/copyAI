// lib/llm-client.ts
import 'server-only';
import { ChatMessage } from '@/types/dashboard/llm';


export async function callLLM(messages: ChatMessage[]) {
  const provider = process.env.AI_API_FORMAT || 'openai';
  const apiKey = process.env.AI_API_KEY;
  const endpoint = process.env.AI_API_ENDPOINT;
  const model = process.env.AI_MODEL_NAME;

  if (!apiKey || !endpoint || !model) throw new Error("AI 配置缺失");

  // --- 1. 协议适配层 ---
  let fetchUrl = endpoint;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  let body: any;

  if (provider === 'gemini') {
    // Gemini 协议适配, Gemini 的 URL 通常包含 API Key
    fetchUrl = `${endpoint}?key=${apiKey}`;
    body = {
      contents: messages
        .filter(m => m.role !== 'system') // Gemini Pro 处理 System 方式不同，简单处理只传内容
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      }
    };
  } else {
    // OpenAI 兼容协议适配 (适用于 OpenAI, DeepSeek, 通义千问)
    headers['Authorization'] = `Bearer ${apiKey}`;
    body = {
      model: model,
      messages: messages,
      temperature: 0.7,
    };
  }

  // --- 2. 发起请求 ---
  const response = await fetch(fetchUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`LLM Provider Error (${provider}):`, errorData);
    throw new Error(`AI 服务异常: ${response.statusText}`);
  }

  const data = await response.json();

  // --- 3. 返回值适配层 ---
  try {
    if (provider === 'gemini') {
      return data.candidates[0].content.parts[0].text;
    }
    // OpenAI 标准返回结构
    return data.choices[0].message.content;
  } catch (err) {
    throw new Error("解析 AI 回复失败，请检查模型配置");
  }
}