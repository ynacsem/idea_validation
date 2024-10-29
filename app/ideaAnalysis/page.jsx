'use client';

import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../_context/AiResponseContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, AlertTriangle, Target, MapPin } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { useRouter } from 'next/navigation';
import { GenerateRoadMap } from '@/configs/AiModel';

// Register chart components
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function AnalysisPage() {
  const { aiResponse } = useContext(MainContext);
  const [trendsData, setTrendsData] = useState([]);

  const { aiRoadMap, setAiRoadMap } = useContext(MainContext);

  const router = useRouter();

  useEffect(() => {

    if (aiResponse?.business_idea) {
      fetch(`/api/trends?keyword=${aiResponse.business_idea}`)
        .then(res => res.json())
        .then(data => setTrendsData(data))
        .catch(error => console.error('Error fetching trends data:', error));
    }
  }, [aiResponse]);

  if (!aiResponse) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-50">
        <p className="text-xl text-gray-600">No analysis available. Please submit an idea first.</p>
      </div>
    );
  }

  const chartData = {
    labels: trendsData?.map(data => new Date(data.formattedTime).toLocaleDateString()),
    datasets: [{
      label: 'Search Interest Over Time',
      data: trendsData.map(data => data.value[0]),
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointHoverRadius: 8,
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      pointHoverBorderWidth: 2,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw}`;
          }
        },
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        titleFont: { size: 16, weight: 'bold' },
        bodyFont: { size: 14 },
        padding: 10,
        displayColors: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#000',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Interest Over Time',
          color: '#000',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    }
  };

  const handleGenerateRoadmap = async() => {
    // TODO: Implement road map generation logic
    const PROMPT = `Generate a high-quality roadmap in JSON format for the following business idea: ${aiResponse?.business_idea}. Each item in the roadmap should include:

id: Step number (starting from 1).
title: Phase of development (e.g., Market Research, Business Plan).
description: Detailed explanation of the phase’s purpose and goals.
requirements: A single, comma-separated string of resources, tools, or actions needed for that phase.
status: Set to 'on progress' for each item.
Provide the roadmap in JSON format, covering all essential phases from initial research to product launch, with each phase status set to 'on progress'.`
    const result = await GenerateRoadMap.sendMessage(PROMPT);
    setAiRoadMap(JSON.parse(result.response.text()));
    console.log(aiRoadMap);
    router.replace('/roadMap');
  };

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

          {/* Google Trends Chart */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-700 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Search Interest Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>

          {/* Generate Road Map Button */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleGenerateRoadmap}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Generate Road Map
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}