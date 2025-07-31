'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  Send, 
  MessageSquare, 
  Bot, 
  User, 
  Clock,
  ThumbsUp,
  ThumbsDown,
  Copy
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  model?: string
}

export function AIChat() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant. I can help you with various tasks including answering questions, generating content, analyzing data, and more. How can I assist you today?',
      timestamp: new Date(Date.now() - 300000),
      model: 'GPT-4'
    },
    {
      id: '2',
      type: 'user',
      content: 'Can you explain the concept of neural networks in simple terms?',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      type: 'assistant',
      content: 'Certainly! A neural network is inspired by the human brain and consists of interconnected nodes (neurons) organized in layers:\n\n1. **Input Layer**: Receives the initial data\n2. **Hidden Layers**: Process the data through weighted connections\n3. **Output Layer**: Produces the final result\n\nEach connection has a weight that adjusts during training, allowing the network to learn patterns and make predictions. It\'s like teaching a computer to recognize patterns by showing it many examples!',
      timestamp: new Date(Date.now() - 180000),
      model: 'GPT-4'
    }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          model: 'gpt-4'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response,
        timestamp: new Date(),
        model: data.model
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
        model: 'Error'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Chat</h1>
          <p className="text-muted-foreground">
            Conversational AI interface for natural language interactions
          </p>
        </div>
        <Badge variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages: {messages.length}
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Chat History */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[70vh] min-h-[500px] max-h-[80vh]">
            <CardHeader className="px-4 py-3 flex-shrink-0">
              <CardTitle>Conversation</CardTitle>
              <CardDescription>
                Chat with AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 px-4 py-2">
              <ScrollArea className="flex-1 w-full border rounded-lg p-2 bg-background/50 overflow-y-auto">
                <div className="space-y-2 pb-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.type === 'assistant' && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-lg p-2 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                          {message.content}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 text-xs opacity-70">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            {formatTime(message.timestamp)}
                            {message.model && (
                              <Badge variant="secondary" className="text-xs">
                                {message.model}
                              </Badge>
                            )}
                          </div>
                          {message.type === 'assistant' && (
                            <div className="flex gap-1 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      {message.type === 'user' && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg p-2">
                        <div className="text-sm">Thinking...</div>
                      </div>
                    </div>
                  )}
                  {/* 添加一些额外的内容来确保滚动条可见 */}
                  {messages.length < 5 && (
                    <>
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="bg-muted rounded-lg p-2 max-w-[85%] sm:max-w-[80%] md:max-w-[75%]">
                          <div className="text-sm">
                            This is an example message to demonstrate scrolling functionality. When you have multiple messages in the conversation, you'll be able to scroll through them using the scrollbar.
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg p-2 max-w-[85%] sm:max-w-[80%] md:max-w-[75%]">
                          <div className="text-sm">
                            I understand! The scrollbar should be visible when there's enough content to scroll through.
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="bg-muted rounded-lg p-2 max-w-[85%] sm:max-w-[80%] md:max-w-[75%]">
                          <div className="text-sm">
                            Exactly! The scrollbar provides a clear visual indicator that there's more content available, and it allows you to easily navigate through the conversation history.
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ScrollArea>
              <div className="flex gap-2 mt-3 pt-2 border-t flex-shrink-0">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      handleSendMessage()
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Info */}
        <div className="space-y-3 w-full">
          {/* AI Models Section */}
          <div className="border rounded-lg bg-card">
            <div className="px-3 py-2 border-b bg-muted/30">
              <div className="text-sm font-medium">AI Models</div>
            </div>
            <div className="divide-y">
              <div className="flex items-center justify-between px-3 py-1.5">
                <span className="text-sm">GPT-4</span>
                <Badge variant="default" className="text-xs">Active</Badge>
              </div>
              <div className="flex items-center justify-between px-3 py-1.5">
                <span className="text-sm">Claude</span>
                <Badge variant="secondary" className="text-xs">Available</Badge>
              </div>
              <div className="flex items-center justify-between px-3 py-1.5">
                <span className="text-sm">Gemini</span>
                <Badge variant="secondary" className="text-xs">Available</Badge>
              </div>
            </div>
          </div>

          {/* Capabilities Section */}
          <div className="border rounded-lg bg-card">
            <div className="px-3 py-2 border-b bg-muted/30">
              <div className="text-sm font-medium">Capabilities</div>
            </div>
            <div className="divide-y">
              <div className="px-3 py-1.5 text-sm">• Natural language understanding</div>
              <div className="px-3 py-1.5 text-sm">• Code generation and analysis</div>
              <div className="px-3 py-1.5 text-sm">• Creative writing</div>
              <div className="px-3 py-1.5 text-sm">• Problem solving</div>
              <div className="px-3 py-1.5 text-sm">• Data analysis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}