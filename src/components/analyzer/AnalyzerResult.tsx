"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Sparkles, CheckCircle, AlertCircle, ArrowRight, Copy, ChevronDown, ChevronUp, Target, TrendingUp, Brain, Zap, Award, Users, BookOpen, Building, DollarSign, Clock, Star, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ScoreCircle from "./ScoreCircle";

function AnalyzerResult({ result, history }: { result: any, history: any[] | undefined}) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    suggestions: true,
    gaps: false,
    advantages: false,
    interview: false,
    nextSteps: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'LOW': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical Skills Match': return <Brain className="h-5 w-5" />;
      case 'Experience Relevance': return <Target className="h-5 w-5" />;
      case 'Impact & Quantifiable Results': return <TrendingUp className="h-5 w-5" />;
      case 'Leadership & Soft Skills': return <Users className="h-5 w-5" />;
      case 'Education & Certifications': return <BookOpen className="h-5 w-5" />;
      case 'Industry Knowledge': return <Building className="h-5 w-5" />;
      default: return <BarChart className="h-5 w-5" />;
    }
  };

  const AccordionSection = ({ 
    title, 
    isExpanded, 
    onToggle, 
    children, 
    icon, 
    badge 
  }: { 
    title: string; 
    isExpanded: boolean; 
    onToggle: () => void; 
    children: React.ReactNode; 
    icon: React.ReactNode;
    badge?: string;
  }) => (
    <Card className="bg-gray-800/40 border-gray-700/50">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-700/20 transition-colors duration-200"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
              {icon}
            </div>
            <CardTitle className="text-xl text-white">{title}</CardTitle>
            {badge && (
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium border border-blue-500/30">
                {badge}
              </span>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );

  const CopyableText = ({ text, label }: { text: string; label: string }) => (
    <div className="group relative bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
      <p className="text-gray-200 leading-relaxed pr-8">{text}</p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => copyToClipboard(text, label)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-white hover:bg-gray-700/50"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header Section with Overall Score and Summary */}
      <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <Sparkles size={28} className="text-yellow-300" />
            Resume Analysis Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Overall Score & Summary */}
          <div className="flex flex-col lg:flex-row items-center gap-8 p-6 bg-gray-900/30 rounded-lg border border-gray-700/50">
            <ScoreCircle score={result.overall_score} />
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-white">Overall Assessment</h3>
              <CopyableText text={result.summary} label="Summary" />
              <div className="p-4 bg-gray-800/50 rounded-md border border-gray-700/30">
                <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  First Impression (15-second scan):
                </h4>
                <p className="text-slate-300 italic">"{result.first_impression}"</p>
              </div>
            </div>
          </div>

          {/* Market Competitiveness */}
          {result.market_competitiveness && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Market Score</span>
                </div>
                <div className="text-2xl font-bold text-white">{result.market_competitiveness.score}%</div>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-400 font-semibold">Salary Range</span>
                </div>
                <div className="text-sm font-medium text-white">{result.market_competitiveness.salary_bracket}</div>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Growth Potential</span>
                </div>
                <div className="text-sm font-medium text-white">{result.market_competitiveness.improvement_potential}</div>
              </div>
              <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart className="h-5 w-5 text-orange-400" />
                  <span className="text-orange-400 font-semibold">ATS Score</span>
                </div>
                <div className="text-2xl font-bold text-white">{result.ats_compatibility.score}%</div>
              </div>
            </div>
          )}

          {/* Categorical Scores */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart size={20} />
              Detailed Category Analysis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.categorical_scores.map((cat: any, index: number) => (
                <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(cat.category)}
                      <h5 className="font-semibold text-white">{cat.category}</h5>
                    </div>
                    <span className="font-bold text-purple-400">{cat.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mb-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${cat.score}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{cat.explanation}</p>
                  {cat.improvement_impact && (
                    <div className="text-xs text-green-400 bg-green-500/10 p-2 rounded border border-green-500/20">
                      <strong>Impact:</strong> {cat.improvement_impact}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Suggestions - Accordion */}
      <AccordionSection
        title="Priority Improvements"
        isExpanded={expandedSections.suggestions}
        onToggle={() => toggleSection('suggestions')}
        icon={<CheckSquare className="h-5 w-5 text-blue-400" />}
        badge={`${result.actionable_suggestions?.length || 0} items`}
      >
        <div className="space-y-4">
          {result.actionable_suggestions?.map((sugg: any, index: number) => (
            <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(sugg.priority)}`}>
                    {sugg.priority}
                  </span>
                  <p className="font-semibold text-purple-400 text-lg">{sugg.area}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(sugg.example.after, 'Suggestion')}
                  className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-red-900/20 rounded-md border border-red-500/20">
                  <p className="text-sm text-red-300"><strong>Issue:</strong> {sugg.issue}</p>
                </div>
                
                <div className="p-3 bg-blue-900/20 rounded-md border border-blue-500/20">
                  <p className="text-sm text-blue-300"><strong>Recommendation:</strong> {sugg.suggestion}</p>
                </div>
                
                <div className="p-3 bg-green-900/20 rounded-md border border-green-500/20">
                  <p className="text-sm text-green-300"><strong>Expected Impact:</strong> {sugg.impact}</p>
                </div>

                {sugg.example.before && sugg.example.before !== "N/A" && (
                  <div className="p-2 bg-red-900/30 rounded-md mb-2">
                    <p className="text-sm text-red-300 italic"><strong>Before:</strong> "<del>{sugg.example.before}</del>"</p>
                  </div>
                )}
                
                <div className="p-3 bg-green-900/30 rounded-md flex items-start gap-2 group cursor-pointer hover:bg-green-900/40 transition-colors"
                     onClick={() => copyToClipboard(sugg.example.after, 'Improved text')}>
                  <ArrowRight size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-green-300"><strong>Improved:</strong> "{sugg.example.after}"</p>
                    <p className="text-xs text-green-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to copy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Critical Gaps - Accordion */}
      <AccordionSection
        title="Critical Gaps Analysis"
        isExpanded={expandedSections.gaps}
        onToggle={() => toggleSection('gaps')}
        icon={<AlertCircle className="h-5 w-5 text-red-400" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.critical_gaps?.missing_keywords?.length > 0 && (
            <div>
              <h5 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Missing Keywords
              </h5>
              <div className="flex flex-wrap gap-2">
                {result.critical_gaps.missing_keywords.map((keyword: string, index: number) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-red-500/20 text-red-300 text-sm font-medium rounded-full border border-red-500/30 cursor-pointer hover:bg-red-500/30 transition-colors"
                    onClick={() => copyToClipboard(keyword, 'Keyword')}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.critical_gaps?.experience_gaps?.length > 0 && (
            <div>
              <h5 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Experience Gaps
              </h5>
              <div className="space-y-2">
                {result.critical_gaps.experience_gaps.map((gap: string, index: number) => (
                  <CopyableText key={index} text={gap} label="Experience gap" />
                ))}
              </div>
            </div>
          )}

          {result.critical_gaps?.qualification_gaps?.length > 0 && (
            <div>
              <h5 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Qualification Gaps
              </h5>
              <div className="space-y-2">
                {result.critical_gaps.qualification_gaps.map((gap: string, index: number) => (
                  <CopyableText key={index} text={gap} label="Qualification gap" />
                ))}
              </div>
            </div>
          )}

          {result.critical_gaps?.soft_skill_gaps?.length > 0 && (
            <div>
              <h5 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Soft Skill Gaps
              </h5>
              <div className="space-y-2">
                {result.critical_gaps.soft_skill_gaps.map((gap: string, index: number) => (
                  <CopyableText key={index} text={gap} label="Soft skill gap" />
                ))}
              </div>
            </div>
          )}
        </div>
      </AccordionSection>

      {/* Competitive Advantages - Accordion */}
      {result.competitive_advantages?.length > 0 && (
        <AccordionSection
          title="Your Competitive Advantages"
          isExpanded={expandedSections.advantages}
          onToggle={() => toggleSection('advantages')}
          icon={<Star className="h-5 w-5 text-yellow-400" />}
          badge={`${result.competitive_advantages.length} strengths`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.competitive_advantages.map((advantage: string, index: number) => (
              <div key={index} className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <CopyableText text={advantage} label="Competitive advantage" />
                </div>
              </div>
            ))}
          </div>
        </AccordionSection>
      )}

      {/* Interview Preparation - Accordion */}
      {result.interview_preparation && (
        <AccordionSection
          title="Interview Preparation Guide"
          isExpanded={expandedSections.interview}
          onToggle={() => toggleSection('interview')}
          icon={<Brain className="h-5 w-5 text-purple-400" />}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {result.interview_preparation.likely_questions?.length > 0 && (
              <div>
                <h5 className="font-semibold text-purple-400 mb-3">Likely Questions</h5>
                <div className="space-y-2">
                  {result.interview_preparation.likely_questions.map((question: string, index: number) => (
                    <CopyableText key={index} text={question} label="Interview question" />
                  ))}
                </div>
              </div>
            )}

            {result.interview_preparation.story_suggestions?.length > 0 && (
              <div>
                <h5 className="font-semibold text-blue-400 mb-3">STAR Stories to Prepare</h5>
                <div className="space-y-2">
                  {result.interview_preparation.story_suggestions.map((story: string, index: number) => (
                    <CopyableText key={index} text={story} label="STAR story" />
                  ))}
                </div>
              </div>
            )}

            {result.interview_preparation.technical_prep?.length > 0 && (
              <div>
                <h5 className="font-semibold text-green-400 mb-3">Technical Preparation</h5>
                <div className="space-y-2">
                  {result.interview_preparation.technical_prep.map((prep: string, index: number) => (
                    <CopyableText key={index} text={prep} label="Technical prep" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </AccordionSection>
      )}

      {/* Next Steps - Accordion */}
      {result.next_steps?.length > 0 && (
        <AccordionSection
          title="Your Action Plan"
          isExpanded={expandedSections.nextSteps}
          onToggle={() => toggleSection('nextSteps')}
          icon={<CheckSquare className="h-5 w-5 text-green-400" />}
          badge="Priority Order"
        >
          <div className="space-y-3">
            {result.next_steps.map((step: string, index: number) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <CopyableText text={step} label={`Action step ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </AccordionSection>
      )}

      {/* ATS Compatibility Details */}
      <Card className="bg-gray-800/40 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <BarChart size={20} />
            ATS Compatibility Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-3xl font-bold ${result.ats_compatibility.score > 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {result.ats_compatibility.score}%
                </div>
                <p className="text-slate-400">ATS Parsing Score</p>
              </div>
              {result.ats_compatibility.keyword_density && (
                <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/30 mb-4">
                  <h6 className="font-semibold text-blue-400 mb-2">Keyword Analysis:</h6>
                  <p className="text-sm text-gray-300">{result.ats_compatibility.keyword_density}</p>
                </div>
              )}
            </div>
            <div>
              <h6 className="font-semibold text-white mb-3">Optimization Recommendations:</h6>
              <div className="space-y-2">
                {result.ats_compatibility.suggestions.map((sugg: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <CopyableText text={sugg} label="ATS suggestion" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyzerResult;