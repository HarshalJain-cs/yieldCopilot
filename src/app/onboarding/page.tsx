"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { CustomCursor } from "@/components/core/custom-cursor";
import { GlassCard } from "@/components/dashboard/glass-card";
import { onboardingSteps } from "@/lib/content/onboarding-steps";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Wallet,
  LayoutDashboard,
  TrendingUp,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";

const stepIcons = [Sparkles, Wallet, LayoutDashboard, TrendingUp, PartyPopper];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const step = onboardingSteps[currentStep];
  const Icon = stepIcons[currentStep] || Sparkles;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark onboarding as complete
      localStorage.setItem('yieldx-onboarding-complete', 'true');
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <CustomCursor />
      <Navbar />

      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}% complete
            </span>
          </div>
          <div className="h-2 bg-[var(--glass-bg)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--brand-lavender)] rounded-full transition-all duration-500"
              style={{
                width: `${((currentStep + 1) / onboardingSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                index === currentStep
                  ? "bg-[var(--brand-lavender)] text-white scale-110"
                  : index < currentStep
                  ? "bg-[var(--success)] text-white"
                  : "bg-[var(--glass-bg)] text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <GlassCard className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-lavender)] flex items-center justify-center mx-auto mb-4">
              <Icon className="w-8 h-8 text-[var(--brand-lavender-deep)]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{step.title}</h1>
            <p className="text-muted-foreground">{step.subtitle}</p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--accent-lavender)]/30">
              <h2 className="text-xl font-semibold mb-2">{step.content.headline}</h2>
              {step.content.description && (
                <p className="text-muted-foreground">{step.content.description}</p>
              )}
            </div>

            {/* Bullets */}
            {step.content.bullets && (
              <div className="space-y-3">
                {step.content.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            )}

            {/* How It Works */}
            {step.content.howItWorks && (
              <div className="space-y-4">
                <h3 className="font-semibold">How It Works</h3>
                {step.content.howItWorks.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--brand-lavender)] text-white flex items-center justify-center flex-shrink-0 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{item.step}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sections (Dashboard walkthrough) */}
            {step.content.sections && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step.content.sections.map((section, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                  >
                    <h4 className="font-semibold mb-1">{section.name}</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      {section.description}
                    </p>
                    {section.location && (
                      <p className="text-xs text-muted-foreground/70">
                        {section.location}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Terms (APY explanation) */}
            {step.content.terms && (
              <div className="space-y-4">
                {step.content.terms.map((term, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                  >
                    <h4 className="font-semibold mb-2">{term.term}</h4>
                    <p className="text-muted-foreground mb-2">{term.definition}</p>
                    {term.example && (
                      <p className="text-sm bg-[var(--accent-mint)]/30 px-3 py-2 rounded-lg">
                        Example: {term.example}
                      </p>
                    )}
                    {term.levels && (
                      <div className="mt-3 space-y-2">
                        {term.levels.map((level, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span
                              className={`w-3 h-3 rounded-full ${
                                level.level.includes("Low")
                                  ? "bg-green-500"
                                  : level.level.includes("Medium")
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span className="font-medium">{level.level}:</span>
                            <span className="text-muted-foreground">{level.meaning}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Next Steps */}
            {step.content.nextSteps && (
              <div className="space-y-3">
                <h3 className="font-semibold">What's Next?</h3>
                {step.content.nextSteps.map((nextStep, index) => (
                  <Link
                    key={index}
                    href={nextStep.link}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)] transition-colors group"
                  >
                    <div>
                      <p className="font-medium">{nextStep.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {nextStep.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            )}

            {/* FAQ */}
            {step.content.faq && (
              <div className="space-y-4">
                <h3 className="font-semibold">Common Questions</h3>
                {step.content.faq.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                  >
                    <p className="font-medium mb-1">{item.q}</p>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tip */}
            {step.content.tip && (
              <div className="p-4 rounded-xl bg-[var(--accent-sky)] border border-[var(--info)]/20">
                <p className="text-sm">
                  <span className="font-semibold">Tip:</span> {step.content.tip}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--glass-border)]">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                currentStep === 0
                  ? "text-muted-foreground cursor-not-allowed"
                  : "hover:bg-[var(--glass-bg)]"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--brand-lavender-deep)] text-white font-medium hover:bg-[var(--brand-lavender)] transition-colors"
            >
              {step.cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </GlassCard>

        {/* Skip option */}
        <div className="text-center mt-6">
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip onboarding and go to dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
