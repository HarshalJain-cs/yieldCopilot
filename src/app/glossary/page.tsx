"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/core/custom-cursor";
import { LiquidBackground } from "@/components/core/liquid-background";
import { GlassCard } from "@/components/dashboard/glass-card";
import { glossaryTerms, glossaryCategories } from "@/lib/content/glossary-terms";
import { Search, ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  // Filter and group terms
  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      terms = terms.filter(
        (term) =>
          term.term.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query) ||
          (term.fullName && term.fullName.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      terms = terms.filter((term) => term.category === selectedCategory);
    }

    return terms;
  }, [searchQuery, selectedCategory]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const toggleTerm = (termName: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(termName)) {
      newExpanded.delete(termName);
    } else {
      newExpanded.add(termName);
    }
    setExpandedTerms(newExpanded);
  };

  return (
    <div className="min-h-screen relative">
      <LiquidBackground preset="Plasma" speed={20} />
      <CustomCursor />
      <Navbar />

      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-lavender)] flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-[var(--brand-lavender-deep)]" />
          </div>
          <h1 className="text-display-md mb-4">DeFi Glossary</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Everything you need to know about DeFi, explained simply. Search for any term or browse by category.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-lavender)] transition-all"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {glossaryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.id
                  ? "bg-[var(--brand-lavender)] text-white"
                  : "bg-[var(--glass-bg)] text-muted-foreground hover:bg-[var(--glass-bg-hover)] border border-[var(--glass-border)]"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-white/70 mb-6">
          {filteredTerms.length} {filteredTerms.length === 1 ? "term" : "terms"} found
        </p>

        {/* Terms list */}
        {Object.keys(groupedTerms)
          .sort()
          .map((letter) => (
            <div key={letter} className="mb-8">
              {/* Letter header */}
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 rounded-xl bg-[var(--brand-lavender)] text-white flex items-center justify-center font-bold">
                  {letter}
                </span>
                <div className="flex-1 h-px bg-[var(--glass-border)]" />
              </div>

              {/* Terms */}
              <div className="space-y-3">
                {groupedTerms[letter].map((term) => {
                  const isExpanded = expandedTerms.has(term.term);
                  return (
                    <GlassCard
                      key={term.term}
                      className="p-0 overflow-hidden"
                      tilt={false}
                    >
                      <button
                        onClick={() => toggleTerm(term.term)}
                        className="w-full p-5 flex items-center justify-between text-left hover:bg-[var(--glass-bg-hover)] transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-lg">{term.term}</h3>
                            {term.riskLevel && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${term.riskLevel === "low"
                                  ? "bg-[var(--accent-mint)] text-green-700"
                                  : term.riskLevel === "medium"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-red-100 text-red-700"
                                  }`}
                              >
                                {term.riskLevel} risk
                              </span>
                            )}
                          </div>
                          {term.fullName && (
                            <p className="text-sm text-muted-foreground">
                              {term.fullName}
                            </p>
                          )}
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-0 border-t border-[var(--glass-border)]">
                          <div className="pt-4 space-y-4">
                            {/* Definition */}
                            <p className="text-muted-foreground">{term.definition}</p>

                            {/* Example */}
                            {term.example && (
                              <div className="p-4 rounded-xl bg-[var(--accent-lavender)]/30">
                                <p className="text-sm font-medium mb-1">Example</p>
                                <p className="text-sm text-muted-foreground">
                                  {term.example}
                                </p>
                              </div>
                            )}

                            {/* Key Points */}
                            {term.keyPoints && term.keyPoints.length > 0 && (
                              <div>
                                <p className="text-sm font-medium mb-2">Key Points</p>
                                <ul className="space-y-2">
                                  {term.keyPoints.map((point, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2 text-sm text-muted-foreground"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-lavender)] mt-2 flex-shrink-0" />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Related Terms */}
                            {term.relatedTerms && term.relatedTerms.length > 0 && (
                              <div>
                                <p className="text-sm font-medium mb-2">Related Terms</p>
                                <div className="flex flex-wrap gap-2">
                                  {term.relatedTerms.map((related) => (
                                    <button
                                      key={related}
                                      onClick={() => {
                                        setSearchQuery(related);
                                        setSelectedCategory("all");
                                      }}
                                      className="px-3 py-1 rounded-full text-sm bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--brand-lavender)] hover:text-white hover:border-[var(--brand-lavender)] transition-colors"
                                    >
                                      {related}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Category badge */}
                            <div className="pt-2">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-lavender)] text-[var(--brand-lavender-deep)]">
                                {term.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          ))}

        {/* Empty state */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[var(--glass-bg)] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No terms found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-[var(--brand-lavender-deep)] font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Learn more CTA */}
        <GlassCard className="mt-12 p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Want to learn more?</h3>
          <p className="text-muted-foreground mb-6">
            Check out our interactive lessons to understand DeFi concepts in depth.
          </p>
          <a
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-lavender-deep)] text-white font-medium hover:bg-[var(--brand-lavender)] transition-colors"
          >
            Start Learning
            <ExternalLink className="w-4 h-4" />
          </a>
        </GlassCard>

        <Footer />
      </main>
    </div>
  );
}
