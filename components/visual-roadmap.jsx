'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Edit2, Save, Plus, Trash2, CheckCircle2, Download } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

const initialRoadmap = [
  {
    id: 1,
    title: "Market Research",
    description: "Conduct thorough market research to validate the business idea.",
    requirements: "Market analysis tools, competitor data, customer surveys",
    status: "on progress"
  },
  {
    id: 2,
    title: "Business Plan",
    description: "Develop a comprehensive business plan including financial projections.",
    requirements: "Financial modeling software, industry benchmarks, SWOT analysis",
    status: "on progress"
  },
  {
    id: 3,
    title: "Funding",
    description: "Secure initial funding through investors or loans.",
    requirements: "Pitch deck, financial statements, business valuation",
    status: "on progress"
  },
  {
    id: 4,
    title: "MVP Development",
    description: "Create a Minimum Viable Product (MVP) to test with early adopters.",
    requirements: "Development team, project management tools, user testing platform",
    status: "on progress"
  },
  {
    id: 5,
    title: "Launch",
    description: "Official launch of the product or service to the target market.",
    requirements: "Marketing strategy, sales funnel, customer support system",
    status: "on progress"
  }
]

export function VisualRoadmapComponent() {
  const [roadmap, setRoadmap] = useState(initialRoadmap)
  const [editingId, setEditingId] = useState(null)
  const [roadmapTitle, setRoadmapTitle] = useState("Business Idea Roadmap")

  const handleEdit = (id) => {
    setEditingId(id)
  }

  const handleSave = () => {
    setEditingId(null)
  }

  const handleChange = (id, field, value) => {
    setRoadmap(roadmap.map(step => 
      step.id === id ? { ...step, [field]: value } : step))
  }

  const handleAddStep = () => {
    const lastId = roadmap.length > 0 ? Math.max(...roadmap.map(step => step.id)) : 0
    const newStep = {
      id: lastId + 1,
      title: "New Step",
      description: "Description for the new step",
      requirements: "Requirements for the new step",
      status: "on progress"
    }
    setRoadmap([...roadmap, newStep])
    setEditingId(newStep.id)
  }

  const handleDeleteStep = (id) => {
    setRoadmap(roadmap.filter(step => step.id !== id))
  }

  const toggleStatus = (id) => {
    setRoadmap(roadmap.map(step => 
      step.id === id ? { ...step, status: step.status === "on progress" ? "finished" : "on progress" } : step))
  }

  const saveRoadmap = () => {
    const roadmapData = {
      title: roadmapTitle,
      steps: roadmap
    }
    const dataStr = JSON.stringify(roadmapData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'roadmap.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    linkElement.remove()

    toast({
      title: "Roadmap Saved",
      description: "Your roadmap has been successfully saved.",
    })
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-red-50 p-6 md:p-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle
            className="text-3xl font-bold text-gray-900 flex items-center justify-center">
            <MapPin className="w-8 h-8 mr-2 text-yellow-500" />
            {editingId === 'title' ? (
              <Input
                value={roadmapTitle}
                onChange={(e) => setRoadmapTitle(e.target.value)}
                onBlur={() => setEditingId(null)}
                className="text-3xl font-bold text-center" />
            ) : (
              <>
                {roadmapTitle}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingId('title')}
                  className="ml-2">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            {roadmap.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="relative z-10 flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${step.status === "finished" ? "bg-green-500" : "bg-blue-500"}`}>
                    {step.id}
                  </div>
                  <div className="ml-4 flex-grow">
                    <Card className="border-blue-200">
                      <CardContent className="p-4">
                        {editingId === step.id ? (
                          <div className="space-y-4">
                            <Input
                              value={step.title}
                              onChange={(e) => handleChange(step.id, 'title', e.target.value)}
                              className="text-lg font-semibold" />
                            <div>
                              <h4 className="font-semibold mb-1">Description:</h4>
                              <Textarea
                                value={step.description}
                                onChange={(e) => handleChange(step.id, 'description', e.target.value)}
                                rows={3} />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">What you need to know:</h4>
                              <Textarea
                                value={step.requirements}
                                onChange={(e) => handleChange(step.id, 'requirements', e.target.value)}
                                rows={3} />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button onClick={handleSave} variant="outline">
                                <Save className="w-4 h-4 mr-2" /> Save Changes
                              </Button>
                              <Button
                                onClick={() => handleDeleteStep(step.id)}
                                variant="outline"
                                className="text-red-500">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-semibold">{step.title}</h3>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(step.id)}>
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => toggleStatus(step.id)}>
                                  <CheckCircle2
                                    className={`w-4 h-4 ${step.status === "finished" ? "text-green-500" : "text-gray-300"}`} />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{step.description}</p>
                            <div>
                              <h4 className="font-semibold text-sm">What you need to know:</h4>
                              <p className="text-sm text-gray-600">{step.requirements}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              onClick={handleAddStep}
              className="bg-green-500 text-white hover:bg-green-600">
              <Plus className="w-5 h-5 mr-2" />
              Add New Step
            </Button>
            <Button
              onClick={saveRoadmap}
              className="bg-blue-500 text-white hover:bg-blue-600">
              <Download className="w-5 h-5 mr-2" />
              Save Roadmap
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}