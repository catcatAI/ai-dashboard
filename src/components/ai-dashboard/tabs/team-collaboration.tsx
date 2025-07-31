'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { 
  Users, 
  MessageSquare, 
  Share2, 
  Clock, 
  Activity,
  Plus,
  Send,
  UserPlus,
  Settings
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  status: 'online' | 'offline' | 'busy'
  lastActive: Date
  currentActivity?: string
}

interface CollaborationMessage {
  id: string
  authorId: string
  authorName: string
  content: string
  timestamp: Date
  type: 'message' | 'activity' | 'system'
}

interface SharedWorkspace {
  id: string
  name: string
  description: string
  members: string[]
  isActive: boolean
  lastUpdated: Date
}

export function TeamCollaboration() {
  const { toast } = useToast()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Alice Chen',
      email: 'alice@example.com',
      status: 'online',
      lastActive: new Date(),
      currentActivity: 'Working on AI Chat optimization'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      status: 'online',
      lastActive: new Date(Date.now() - 300000),
      currentActivity: 'Image generation experiments'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      status: 'busy',
      lastActive: new Date(Date.now() - 600000),
      currentActivity: 'Code analysis review'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david@example.com',
      status: 'offline',
      lastActive: new Date(Date.now() - 3600000)
    }
  ])

  const [messages, setMessages] = useState<CollaborationMessage[]>([
    {
      id: '1',
      authorId: 'system',
      authorName: 'System',
      content: 'Welcome to the team collaboration space! Start working together on AI projects.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'system'
    },
    {
      id: '2',
      authorId: '1',
      authorName: 'Alice Chen',
      content: 'Just finished optimizing the AI Chat response time by 40%!',
      timestamp: new Date(Date.now() - 1800000),
      type: 'message'
    },
    {
      id: '3',
      authorId: '2',
      authorName: 'Bob Smith',
      content: 'Great work! I\'m testing the new image generation models now.',
      timestamp: new Date(Date.now() - 1200000),
      type: 'message'
    }
  ])

  const [workspaces, setWorkspaces] = useState<SharedWorkspace[]>([
    {
      id: '1',
      name: 'AI Model Development',
      description: 'Core AI model training and optimization',
      members: ['1', '2', '3'],
      isActive: true,
      lastUpdated: new Date()
    },
    {
      id: '2',
      name: 'Dashboard UI/UX',
      description: 'Frontend design and user experience improvements',
      members: ['1', '4'],
      isActive: false,
      lastUpdated: new Date(Date.now() - 86400000)
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const message: CollaborationMessage = {
      id: Date.now().toString(),
      authorId: 'current-user',
      authorName: 'You',
      content: newMessage,
      timestamp: new Date(),
      type: 'message'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    setIsSending(true)

    // Simulate network delay
    setTimeout(() => {
      setIsSending(false)
      toast({
        title: "Message sent",
        description: "Your message has been shared with the team.",
      })
    }, 500)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const onlineMembers = teamMembers.filter(m => m.status === 'online').length
  const totalMembers = teamMembers.length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Collaboration</h1>
          <p className="text-muted-foreground">
            Real-time collaboration and team management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Workspace
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="py-2 gap-2">
          <CardContent className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-muted-foreground">
                  Team Members
                </p>
                <p className="text-2xl font-bold leading-none">{totalMembers}</p>
              </div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {onlineMembers} online now
            </p>
          </CardContent>
        </Card>

        <Card className="py-2 gap-2">
          <CardContent className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Workspaces
                </p>
                <p className="text-2xl font-bold leading-none">{workspaces.filter(w => w.isActive).length}</p>
              </div>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {workspaces.length} total
            </p>
          </CardContent>
        </Card>

        <Card className="py-2 gap-2">
          <CardContent className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-muted-foreground">
                  Messages Today
                </p>
                <p className="text-2xl font-bold leading-none">{messages.filter(m => 
                  new Date(m.timestamp).toDateString() === new Date().toDateString()
                ).length}</p>
              </div>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Team communication
            </p>
          </CardContent>
        </Card>

        <Card className="py-2 gap-2">
          <CardContent className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Projects
                </p>
                <p className="text-2xl font-bold leading-none">7</p>
              </div>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              In progress
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Team Members */}
        <div className="space-y-3">
          <div className="border rounded-lg bg-card">
            <div className="px-3 py-2 border-b bg-muted/30">
              <div className="text-sm font-medium">Team Members</div>
              <div className="text-xs text-muted-foreground">Current team status and activity</div>
            </div>
            <div className="divide-y">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.currentActivity || 'No activity'}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatTime(member.lastActive)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg bg-card">
            <div className="px-3 py-2 border-b bg-muted/30">
              <div className="text-sm font-medium">Workspaces</div>
              <div className="text-xs text-muted-foreground">Shared project spaces</div>
            </div>
            <div className="divide-y">
              {workspaces.map((workspace) => (
                <div key={workspace.id} className="px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="text-sm font-medium">{workspace.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {workspace.description}
                      </p>
                    </div>
                    <Badge variant={workspace.isActive ? 'default' : 'secondary'} className="text-xs">
                      {workspace.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{workspace.members.length} members</span>
                    <span>{formatTime(workspace.lastUpdated)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collaboration Chat */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg bg-card flex flex-col h-[70vh] min-h-[500px] max-h-[80vh]">
            <div className="px-3 py-2 border-b bg-muted/30 flex-shrink-0">
              <div className="text-sm font-medium">Team Chat</div>
              <div className="text-xs text-muted-foreground">Real-time team communication</div>
            </div>
            <div className="flex-1 flex flex-col min-h-0 px-3 py-2">
              <ScrollArea className="flex-1 w-full border rounded-lg p-2 bg-background/50 overflow-y-auto">
                <div className="space-y-2 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.authorId === 'current-user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.authorId !== 'current-user' && (
                        <div className="flex-shrink-0">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {message.authorName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-lg p-2 ${
                          message.authorId === 'current-user'
                            ? 'bg-primary text-primary-foreground'
                            : message.type === 'system'
                            ? 'bg-muted border border-border'
                            : 'bg-muted'
                        }`}
                      >
                        {message.authorId !== 'current-user' && message.type !== 'system' && (
                          <div className="text-xs font-medium mb-1">
                            {message.authorName}
                          </div>
                        )}
                        <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                          {message.content}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 text-xs opacity-70">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                      {message.authorId === 'current-user' && (
                        <div className="flex-shrink-0">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex gap-2 mt-2 pt-2 border-t flex-shrink-0">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message to the team..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isSending) {
                      handleSendMessage()
                    }
                  }}
                  disabled={isSending}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSending}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}