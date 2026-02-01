"use client";

import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowRight,
  BarChart3,
  Bell,
  Brain,
  CheckCircle,
  Clock,
  Code,
  Frown,
  Globe,
  GraduationCap,
  HelpCircle,
  LayoutGrid,
  Lock,
  Moon,
  Search,
  Shield,
  Shuffle,
  Smartphone,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { CountUp } from "@/components/core/count-up";
import { CustomCursor } from "@/components/core/custom-cursor";
import { FAQAccordion } from "@/components/core/faq-accordion";
import { ParallaxCardGrid } from "@/components/core/parallax-card-grid";
import { ScrollAnimate } from "@/components/core/scroll-animate";
import { TextScrollReveal } from "@/components/core/text-scroll-reveal";
import { VideoBackground } from "@/components/core/video-background";
import { WavyNavLink } from "@/components/core/wavy-nav-link";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import {
  ctaContent,
  featuresContent,
  howItWorksContent,
  problemContent,
  securityContent,
  solutionContent,
  trackedAssetsContent,
} from "@/lib/content/about-content";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  AlertTriangle,
  Shuffle,
  Frown,
  HelpCircle,
  Clock,
  LayoutGrid,
  Zap,
  GraduationCap,
  Shield,
  Lock,
  Bell,
  Wallet,
  Search,
  ArrowDownToLine,
  BarChart3,
  Sparkles,
  Globe,
  Smartphone,
  Moon,
  Code,
  CheckCircle,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      {/* Video Background - blurred with gradient overlay */}
      <VideoBackground
        src="/videos/crypto-animation.mp4"
        blur={3}
        opacity={0.4}
        gradientFrom="var(--background)"
        gradientTo="transparent"
      />

      <CustomCursor />
      <Navbar />

      <main className="relative z-10">
        {/* Hero Landing - Full Screen */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-40">
          <div className="text-center max-w-4xl mx-auto">
            <TextScrollReveal
              text="The future of DeFi yields is beautiful"
              unit="Words"
              fontSize="clamp(2.5rem, 6vw, 5rem)"
              fontWeight={700}
              className="mb-8"
            />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in opacity-80">
              Track, compare, and optimize your stablecoin yields with real-time
              data
            </p>
            <div className="flex items-center justify-center gap-4 animate-fade-in">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-full bg-[var(--brand-lavender-deep)] text-white font-semibold hover:bg-[var(--brand-lavender)] transition-all shadow-lg hover:shadow-[var(--glow-lavender)] hover:scale-105"
              >
                Start Tracking
              </Link>
              <Link
                href="#about"
                className="px-8 py-4 rounded-full glass-button font-semibold hover:scale-105 transition-transform"
              >
                Learn More ↓
              </Link>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <ScrollAnimate animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-display-md mb-4">
                {problemContent.headline}
              </h2>
              <p className="text-lg text-muted-foreground">
                {problemContent.subheadline}
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemContent.problems.map((problem, index) => {
              const Icon = iconMap[problem.icon] || HelpCircle;
              return (
                <ScrollAnimate
                  key={index}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <GlassCard className="p-6 h-full">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {problem.description}
                    </p>
                  </GlassCard>
                </ScrollAnimate>
              );
            })}
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 py-16 bg-[var(--accent-lavender)] rounded-3xl">
          <ScrollAnimate animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-display-md mb-4">
                {solutionContent.headline}
              </h2>
              <p className="text-lg text-muted-foreground">
                {solutionContent.subheadline}
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionContent.solutions.map((solution, index) => {
              const Icon = iconMap[solution.icon] || Sparkles;
              return (
                <ScrollAnimate
                  key={index}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 h-full">
                    <div className="w-12 h-12 rounded-xl bg-[var(--brand-lavender)] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {solution.description}
                    </p>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-display-md mb-4">
              {howItWorksContent.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksContent.steps.map((step, index) => {
              const _Icon = iconMap[step.icon] || Sparkles;
              return (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index < howItWorksContent.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-[var(--glass-border)]" />
                  )}

                  <GlassCard className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-[var(--brand-lavender)] flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-display-md mb-4">{featuresContent.headline}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuresContent.features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              return (
                <GlassCard key={index} className="p-5 text-center">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-lavender)] flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[var(--brand-lavender-deep)]" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Tracked Assets */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-display-md mb-4">
              {trackedAssetsContent.headline}
            </h2>
            <p className="text-lg text-muted-foreground">
              {trackedAssetsContent.subheadline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trackedAssetsContent.assets.map((asset, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                    style={{ backgroundColor: asset.color }}
                  >
                    {asset.symbol.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{asset.symbol}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          asset.riskLevel === "low"
                            ? "bg-[var(--accent-mint)] text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {asset.riskLevel === "low" ? "Low Risk" : "Medium Risk"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {asset.name} · {asset.type}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {asset.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {asset.keyPoints.map((point, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full text-xs bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Security Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-display-md mb-4">{securityContent.headline}</h2>
            <p className="text-lg text-muted-foreground">
              {securityContent.subheadline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {securityContent.points.map((point, index) => {
              const Icon = iconMap[point.icon] || Shield;
              return (
                <GlassCard key={index} className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-mint)] flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>

          <div className="glass-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {securityContent.disclaimer}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-display-md mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about YieldX
            </p>
          </div>
          <FAQAccordion />
        </section>

        {/* Quick Links with Wavy Animation */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <div className="flex items-center justify-center gap-12 flex-wrap">
            <WavyNavLink
              href="/dashboard"
              label="Track Yields"
              labelFontSize={18}
            />
            <WavyNavLink href="/learn" label="Learn DeFi" labelFontSize={18} />
            <WavyNavLink href="/glossary" label="Glossary" labelFontSize={18} />
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display-md mb-4">Meet the Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The brilliant minds behind YieldX, building the future of DeFi
                yields
              </p>
            </div>

            <ParallaxCardGrid
              cards={[
                {
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
                  title: "Hitesh P",
                  description:
                    "Co-Founder & CEO. Visionary leader driving the mission to democratize DeFi yields.",
                  tag: "Co-Founder",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
                  title: "Harshal Jain",
                  description:
                    "Co-Founder & CTO. Blockchain architect building the technical foundation.",
                  tag: "Co-Founder",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
                  title: "Tushar Jain",
                  description:
                    "Co-Founder & COO. Operations expert ensuring seamless platform experience.",
                  tag: "Co-Founder",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
                  title: "Shreyas Chowdhary",
                  description:
                    "Co-Founder & CPO. Product visionary crafting intuitive DeFi experiences.",
                  tag: "Co-Founder",
                },
              ]}
              columns={4}
              gap={24}
              aspectRatio={1.3}
              borderRadius={20}
              tiltDepth={10}
              enableGlare={true}
              enableGlassmorphism={true}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[var(--brand-lavender)] to-[var(--brand-lavender-deep)] rounded-3xl p-12 text-center text-white overflow-hidden">
            {/* Animated Heading */}
            <h2 className="text-display-md mb-4 animate-fade-in-up">
              {ctaContent.headline}
            </h2>
            <p
              className="text-lg opacity-90 mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {ctaContent.subheadline}
            </p>

            {/* Animated Stats with CountUp */}
            <div className="flex items-center justify-center gap-8 mb-12">
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="text-3xl font-bold">
                  <CountUp prefix="$" end={12} suffix="M+" duration={2000} />
                </p>
                <p className="text-sm opacity-75">Total Value Tracked</p>
              </div>
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                <p className="text-3xl font-bold">
                  <CountUp end={5000} suffix="+" duration={2000} />
                </p>
                <p className="text-sm opacity-75">Active Users</p>
              </div>
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <p className="text-3xl font-bold">
                  <CountUp end={99.9} suffix="%" duration={2000} decimals={1} />
                </p>
                <p className="text-sm opacity-75">Uptime</p>
              </div>
            </div>

            {/* Animated Buttons */}
            <div
              className="flex items-center justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Link
                href="/dashboard"
                className="group px-8 py-4 rounded-full bg-white text-[var(--brand-lavender-deep)] font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-white/25"
              >
                {ctaContent.buttons.primary}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/glossary"
                className="px-8 py-4 rounded-full border-2 border-white/30 font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105"
              >
                {ctaContent.buttons.secondary}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
