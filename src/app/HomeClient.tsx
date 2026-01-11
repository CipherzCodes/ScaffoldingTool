"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import yaml from "js-yaml";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TemplateGrid from "@/components/TemplateGrid";
import { ConfigForm } from "@/components/ConfigForm";
import Stepper from "@/components/Stepper";
import YamlEditorPreview from "@/components/YamlEditorPreview";
import { TEMPLATE_REGISTRY } from "@/data/scaffoldingTemplates";
import { Template } from "@/types/template";
import Button from "@/components/Button";

import { saveConfig, getConfig } from "@/lib/supabase/configs";
import { useAuth } from "@/hooks/useAuth";

export default function HomeClient() {
    const [language, setLanguage] = useState<"Python" | "C#">("Python");
    const [step, setStep] = useState(0);
    const [template, setTemplate] = useState<Template | null>(null);

    const [formState, setFormState] = useState<any>({});
    const [yamlText, setYamlText] = useState("");
    const [isEditingYaml, setIsEditingYaml] = useState(false);

    const { user } = useAuth();
    const [configId, setConfigId] = useState<string | null>(null);

    const searchParams = useSearchParams();

    const projectName =
        formState?.project?.name?.trim() || null;

    const [isDirty, setIsDirty] = useState(false);

    /* Sync FORM → YAML */
    useEffect(() => {
        if (!isEditingYaml) {
            try {
                setYamlText(
                    yaml.dump(formState, {
                        noRefs: true,
                        lineWidth: -1,
                    })
                );
            } catch { }
        }
    }, [formState, isEditingYaml]);

    /* Load config from ?config=<id> */
    useEffect(() => {
        const id = searchParams.get("config");
        if (!id) return;

        getConfig(id).then(({ data }) => {
            if (!data) return;

            setConfigId(data.id);
            setFormState(data.yaml);
            setYamlText(
                yaml.dump(data.yaml, { noRefs: true, lineWidth: -1 })
            );
            setLanguage(data.language);

            const foundTemplate =
                TEMPLATE_REGISTRY[data.language as "Python" | "C#"]?.find(
                    (t) => t.name === data.template || t.id === data.template
                ) ?? null;

            setTemplate(foundTemplate);
            setStep(2);
        });
    }, [searchParams]);

    return (
        <div className="h-screen">
            <Sidebar />

            <div className="flex flex-col h-full pl-28">
                <Header
                    language={language}
                    setLanguage={setLanguage}
                    step={step}
                    title={
                        step === 2 && projectName
                            ? `Configure: ${projectName}`
                            : undefined
                    }
                />

                <main className="flex-1 dark:bg-[radial-gradient(ellipse_at_top,#1a1a1d,transparent_70%)]">

                    <div className="max-w-7xl mx-auto px-10 py-8 animate-fade-in">
                        {/* Stepper */}
                        <div className="mb-6">
                            <Stepper
                                step={step}
                                onStepClick={(target) => {
                                    if (target !== 3) setIsEditingYaml(false);
                                    setStep(target);
                                }}
                            />
                        </div>

                        {/* Canvas */}
                        <div className="relative flex justify-center">
                            <div
                                className={`
                            w-full rounded-3xl
                            ${step === 2 ? "max-w-7xl" : "max-w-5xl"}
                            bg-white/90 dark:bg-neutral-900
                            backdrop-blur-sm
                            border border-gray-200 dark:border-neutral-800
                            shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                            dark:shadow-[0_40px_120px_rgba(0,0,0,0.95)]
                            px-12 py-10
                            animate-fade-in
                          `}
                            >
                                {/* STEP 0 */}
                                {step === 0 && (
                                    <div className="flex flex-col items-center justify-center h-[40vh] gap-4">
                                        <div className="text-center space-y-2">
                                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                Start a new scaffolding flow
                                            </h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                                                Choose a language, pick a template, and generate your
                                                project structure.
                                            </p>
                                        </div>

                                        <Button onClick={() => setStep(1)}>
                                            Start Scaffolding
                                        </Button>
                                    </div>
                                )}

                                {/* STEP 1 — TEMPLATE */}
                                {step === 1 && (
                                    <TemplateGrid
                                        templates={TEMPLATE_REGISTRY[language]}
                                        onSelect={(t) => {
                                            setTemplate(t);
                                            setFormState({});
                                            setYamlText("");
                                            setConfigId(null);
                                            setIsEditingYaml(false);
                                            setStep(2);
                                        }}
                                        onBack={() => setStep(0)}
                                    />
                                )}

                                {/* STEP 2 — CONFIG */}
                                {step === 2 && template && (
                                    <>
                                        <ConfigForm
                                            template={template}
                                            values={formState}
                                            onChange={(next) => {
                                                setFormState(next);
                                                setIsDirty(true);
                                            }}
                                            onGenerate={() => {
                                                setIsEditingYaml(false);
                                                setStep(3);
                                            }}
                                            onBack={() => {
                                                setIsEditingYaml(false);
                                                setStep(1);
                                            }}
                                        />

                                        {user && (
                                            <div className="mt-4 flex justify-end">
                                                <Button
                                                    disabled={!projectName}
                                                    onClick={async () => {
                                                        if (!template || !user || !projectName) return;

                                                        const { data } = await saveConfig({
                                                            id: configId ?? undefined,
                                                            userId: user.id,
                                                            name: projectName,
                                                            language,
                                                            template: template.id ?? template.name,
                                                            yaml: formState,
                                                        });

                                                        if (data && !configId) {
                                                            setConfigId(data.id);
                                                        }

                                                        setIsDirty(false);
                                                    }}
                                                >
                                                    Save Config
                                                </Button>

                                            </div>
                                        )}

                                    </>
                                )}

                                {/* STEP 3 — YAML EDITOR */}
                                {step === 3 && (
                                    <YamlEditorPreview
                                        yaml={yamlText}
                                        onChange={(nextYaml) => {
                                            setIsEditingYaml(true);
                                            setYamlText(nextYaml);

                                            try {
                                                const parsed = yaml.load(nextYaml);
                                                if (typeof parsed === "object" && parsed !== null) {
                                                    setFormState(parsed);
                                                }
                                            } catch {
                                                // invalid YAML — do not break form
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
