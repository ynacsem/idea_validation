'use client'

import React, { useContext } from 'react'
import { AiResponseContext } from '../_context/AiResponseContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, AlertTriangle, Target } from 'lucide-react'

export default function AnalysisPage() {
  const { aiResponse } = useContext(AiResponseContext)

  if (!aiResponse) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-50">
        <p className="text-xl text-gray-600">No analysis available. Please submit an idea first.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-red-50 p-6 md:p-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            <Lightbulb className="inline-block w-8 h-8 mr-2 text-yellow-500" />
            Business Idea Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Business Idea */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-yellow-200">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 flex items-center">
              <span className="text-2xl mr-2" role="img" aria-label="Idea">💡</span> Business Idea:
            </h2>
            <p className="text-gray-700">{aiResponse?.business_idea}</p>
          </div>

          {/* Strengths */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-700 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {aiResponse.analysis?.strengths?.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2" role="img" aria-label="Strength">✅</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-red-700 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {aiResponse.analysis?.weaknesses?.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2" role="img" aria-label="Weakness">⚠️</span>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Key Areas to Focus On */}
          <Card className="border-yellow-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-yellow-700 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Key Areas to Focus On
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {aiResponse.analysis?.key_areas_to_focus_on?.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2" role="img" aria-label="Focus Area">🎯</span>
                    <span className="text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}