type Props = {
  currentStep: number;
};

export default function StepIndicator({
  currentStep,
}: Props) {
  const steps = [1, 2, 3];

  return (
    <div className="mb-10 flex items-center">
      {steps.map((step, index) => (
        <div
          key={step}
          className="flex flex-1 items-center"
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold
            ${
              currentStep >= step
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            {step}
          </div>

          {index < steps.length - 1 && (
            <div className="mx-2 h-px flex-1 bg-border" />
          )}
        </div>
      ))}
    </div>
  );
}