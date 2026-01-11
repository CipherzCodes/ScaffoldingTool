"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listConfigs, deleteConfig } from "@/lib/supabase/configs";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [configs, setConfigs] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      listConfigs(user.id).then(({ data }) => {
        setConfigs(data ?? []);
      });
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="max-w-5xl mx-auto px-10 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-medium">My Configurations</h1>

        <Button onClick={() => router.push("/")}>
          + New Configuration
        </Button>
      </div>

      {configs.length === 0 ? (
        <p className="text-sm text-gray-500">
          No configurations yet.
        </p>
      ) : (
        <div className="space-y-3">
          {configs.map((cfg) => (
            <div
              key={cfg.id}
              className="flex items-center justify-between border rounded-xl p-4"
            >
              <div>
                <div className="font-medium">{cfg.name}</div>
                <div className="text-xs text-gray-500">
                  {cfg.language} • {new Date(cfg.updated_at).toLocaleString()}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() =>
                    router.push(`/?config=${cfg.id}`)
                  }
                >
                  Open
                </Button>

                <Button
                  variant="ghost"
                  onClick={async () => {
                    await deleteConfig(cfg.id);
                    setConfigs((c) =>
                      c.filter((x) => x.id !== cfg.id)
                    );
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
