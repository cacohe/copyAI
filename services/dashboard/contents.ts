import { createClient } from "@/lib/supabase/server";

export async function saveContent(platform: string, topic: string, keywords: string, content: string): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: "cannot get user info" }
  }
  
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
    return { success: false, message: error.message }
  }
  
  return { success: true }
}