import { supabase } from "./client";
import { ConfigRow } from "@/types/config";

export async function saveConfig({
  id,
  userId,
  name,
  language,
  template,
  yaml,
}: {
  id?: string;
  userId: string;
  name: string;
  language: string;
  template: string;
  yaml: any;
}) {
  if (id) {
    return supabase
      .from("configs")
      .update({
        name,
        language,
        template,
        yaml,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single<ConfigRow>(); // 👈 important
  }

  return supabase
    .from("configs")
    .insert({
      user_id: userId,
      name,
      language,
      template,
      yaml,
    })
    .select()
    .single<ConfigRow>(); // 👈 important
}


export async function listConfigs(userId: string) {
  return supabase
    .from("configs")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
}

export async function getConfig(id: string) {
  return supabase
    .from("configs")
    .select("*")
    .eq("id", id)
    .single();
}

export async function deleteConfig(id: string) {
  return supabase.from("configs").delete().eq("id", id);
}
