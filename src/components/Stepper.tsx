type StepperProps = {
  step: number;
  onStepClick?: (step: number) => void;
};

const steps = ["Language", "Template", "Configure", "Generate"];

export default function Stepper({ step, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {steps.map((s, i) => {
        const isActive = i === step;
        const isCompleted = i < step;
        const isClickable = onStepClick && i <= step;

        return (
          <div key={s} className="flex items-center gap-4">
            {/* Step */}
            <div
              onClick={() => isClickable && onStepClick(i)}
              className={[
                "flex items-center gap-2 text-sm",
                isClickable && "cursor-pointer",
                isActive
                  ? "text-black font-medium"
                  : isCompleted
                  ? "text-gray-700"
                  : "text-gray-400",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Number */}
              <div
                className={[
                  "flex items-center justify-center w-6 h-6 rounded-full text-xs",
                  isActive
                    ? "bg-black text-white"
                    : isCompleted
                    ? "border border-gray-300 text-gray-700"
                    : "border border-gray-200 text-gray-400",
                ].join(" ")}
              >
                {i + 1}
              </div>

              {/* Label */}
              <span>{s}</span>
            </div>

            {/* Divider */}
            {i < steps.length - 1 && (
              <div className="w-8 h-px bg-gray-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}
