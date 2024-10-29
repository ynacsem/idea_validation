'use client'

import React, { useState, useContext, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Edit2, Save, Plus, Trash2, Download, ArrowRight, ArrowLeft } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { MainContext } from '@/app/_context/AiResponseContext'
import { cn } from "@/lib/utils"

const statusColors = {
  finished: 'bg-green-100 text-green-800',
  'on progress': 'bg-blue-100 text-blue-800',
  future: 'bg-blue-100 text-blue-800',
}

const cardBackgroundColors = {
  finished: 'bg-green-50',
  'on progress': 'bg-white',
  future: 'bg-blue-50',
}

const statusOrder = ['finished', 'on progress', 'future']

export default function VisualRoadmap() {
  const { aiRoadMap, setAiRoadMap } = useContext(MainContext);
  const [roadmap, setRoadmap] = useState(aiRoadMap);
  const [editingId, setEditingId] = useState(null);
  const [roadmapTitle, setRoadmapTitle] = useState("Business Idea Roadmap");

  useEffect(() => {
    setRoadmap(aiRoadMap);
  }, [aiRoadMap]);

  const handleEdit = (id) => setEditingId(id);
  const handleSave = () => {
    setEditingId(null);
    setAiRoadMap(roadmap);
  }

  const handleChange = (id, field, value) => {
    setRoadmap(roadmap.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  }

  const handleAddStep = () => {
    const newId = roadmap.length > 0 ? Math.max(...roadmap.map(step => step.id)) + 1 : 1;
    const newStep = {
      id: newId,
      title: "New Step",
      description: "Description for the new step",
      requirements: "Requirements for the new step",
      status: "on progress"
    };
    setRoadmap([...roadmap, newStep]);
    setEditingId(newId);
  }

  const handleDeleteStep = (id) => {
    setRoadmap(roadmap.filter(step => step.id !== id));
  }

  const changeStatus = (id, direction) => {
    setRoadmap(roadmap.map(step => {
      if (step.id === id) {
        const currentIndex = statusOrder.indexOf(step.status);
        const newIndex = (currentIndex + direction + statusOrder.length) % statusOrder.length;
        return { ...step, status: statusOrder[newIndex] };
      }
      return step;
    }));
  }

  const saveRoadmap = () => {
    const roadmapData = { title: roadmapTitle, steps: roadmap };
    const dataStr = JSON.stringify(roadmapData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'roadmap.json');
    linkElement.click();
    linkElement.remove();

    toast({
      title: "Roadmap Saved",
      description: "Your roadmap has been successfully saved.",
    });
  }

  const sortedRoadmap = [...roadmap].sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <Card className="max-w-7xl mx-auto shadow-lg">
        <CardHeader className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <MapPin className="w-8 h-8 mr-2 text-yellow-500" />
              {editingId === 'title' ? (
                <Input
                  value={roadmapTitle}
                  onChange={(e) => setRoadmapTitle(e.target.value)}
                  onBlur={() => setEditingId(null)}
                  className="text-2xl font-bold"
                  placeholder="Enter roadmap title"
                />
              ) : (
                <span>{roadmapTitle}</span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingId('title')}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <Edit2 className="w-4 h-4" />
                <span className="sr-only">Edit title</span>
              </Button>
            </CardTitle>
            <div className="flex space-x-2">
              <Button onClick={handleAddStep} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-2" />
                Add New Step
              </Button>
              <Button onClick={saveRoadmap} variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                <Download className="w-4 h-4 mr-2" />
                Save Roadmap
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statusOrder.map((status) => (
              <div key={status} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700 capitalize">{status === 'on progress' ? 'In Progress' : status}</h2>
                {sortedRoadmap.filter(step => step.status === status).map((step) => (
                  <Card key={step.id} className={cn("shadow-sm hover:shadow-md transition-shadow duration-200", cardBackgroundColors[step.status])}>
                    <CardContent className="p-4">
                      {editingId === step.id ? (
                        <div className="space-y-4">
                          <Input
                            value={step.title}
                            onChange={(e) => handleChange(step.id, 'title', e.target.value)}
                            className="text-lg font-semibold"
                            placeholder="Step title"
                          />
                          <Textarea
                            value={step.description}
                            onChange={(e) => handleChange(step.id, 'description', e.target.value)}
                            rows={2}
                            placeholder="Step description"
                            className="resize-none text-sm text-gray-600"
                          />
                          <Textarea
                            value={step.requirements}
                            onChange={(e) => handleChange(step.id, 'requirements', e.target.value)}
                            rows={2}
                            placeholder="What you need to know"
                            className="resize-none text-sm text-gray-500"
                          />
                          <div className="flex justify-end space-x-2">
                            <Button onClick={handleSave} variant="outline" size="sm">
                              <Save className="w-4 h-4 mr-2" /> Save Changes
                            </Button>
                            <Button onClick={() => handleDeleteStep(step.id)} variant="outline" size="sm" className="text-red-500 hover:bg-red-50">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-800">
                              <span className="mr-2 text-gray-500">#{step.id}</span>
                              {step.title}
                            </h3>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(step.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <Edit2 className="w-4 h-4" />
                                <span className="sr-only">Edit step</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => changeStatus(step.id, -1)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="sr-only">Move left</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => changeStatus(step.id, 1)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <ArrowRight className="w-4 h-4" />
                                <span className="sr-only">Move right</span>
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          <div className="text-sm text-gray-500">
                            <h4 className="font-semibold">What you need to know:</h4>
                            <p>{step.requirements}</p>
                          </div>
                          <div className="flex justify-end">
                            <span className={cn(
                              "text-xs font-medium px-2 py-1 rounded",
                              statusColors[step.status]
                            )}>
                              {status === 'on progress' ? 'In Progress' : status}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}