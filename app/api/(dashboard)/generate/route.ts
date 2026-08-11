import { createClient } from '@/lib/supabase/server'
import { checkContentSafe } from '@/services/dashboard/moderation'
import { generateAIContent } from '@/services/dashboard/ai-service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { platform, topic, keywords } = await req.json()
  
  // 1. 获取用户信息
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "cannot get user info" }, { status: 401 })
  }

  // 2. 安全检测
  const isSafe = await checkContentSafe(`${topic} ${keywords}`)
  if (!isSafe) return NextResponse.json({ error: '输入包含违规词' }, { status: 400 })

  // 3. 生成文案
  const content = await generateAIContent(platform, topic, keywords)

  // 5. 存入记录并关联用户
  const { error } = await supabase
    .from('generated_contents')
    .insert({
      platform,
      topic,
      keywords,
      content,
      user_id: user.id, // 自动关联当前登录用户
    })
  if (error) {
    console.error("Save Content Error:", error)
    return NextResponse.json({ error: '保存内容失败' }, { status: 500 })
  }
  console.log("Content saved successfully for user:", user.id)

  return NextResponse.json({ content })
}