'use client'

import { useState ,useContext} from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GenerateIdeaAI } from '@/configs/AiModel'
import {useRouter} from 'next/navigation'
import { AiResponseContext } from '@/app/_context/AiResponseContext'

export default function IdeaValidationModal({ isOpen, onClose }) {
    const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { aiResponse, setAiResponse } = useContext(AiResponseContext);

  const handleSubmit = async(e) => {
    e.preventDefault()
    // Your validation logic here
    const PROMPT = 'Generate an analysis of the following business idea, focusing on its strengths, weaknesses, and key areas to focus on for improvement.\n\nBusiness Idea:'+title
    const result = await GenerateIdeaAI.sendMessage(PROMPT);
    
    console.log(JSON.parse(result.response.text()))
    setAiResponse(JSON.parse(result.response.text()))
    router.push('/ideaAnalysis')
    
    onClose()
  }
  const GenerateCourseLayout=async() =>{
    setIsLoading(true)
    const BASIC_PROMPT = 'Genrate A Course tutoriel following detail with field as course name,description,along with chapter name,about,duration:'
    const USER_INPUT_PROMPT = 'Category:'+userInput?.category+',Topic:'+userInput?.topic+',Level :'+userInput?.level+',Duration:'+userInput?.duration+',NoOf Chapters:'+userInput?.noOfChapters+',in JSON format'
    const FINAL_PROMPT = BASIC_PROMPT+USER_INPUT_PROMPT
    console.log(FINAL_PROMPT)
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    console.log(JSON.parse(result.response.text()))
    setIsLoading(false)
    SaveCourseLayoutInDb(JSON.parse(result.response.text()))
}

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Validate Your Idea</DialogTitle>
            <DialogDescription>
              Enter your idea below and we'll help you validate it quickly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idea-title" className="text-right">
              💡Idea
              </Label>
              <Input 
                id="idea-title" 
                className="col-span-3" 
                placeholder="Enter a full description of your idea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
           
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-200">
              Validate Now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}