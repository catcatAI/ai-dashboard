'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  Zap, 
  Brain, 
  Bot, 
  MessageSquare, 
  Image as ImageIcon, 
  Search, 
  Code,
  TrendingUp,
  Users,
  Database,
  Cpu
} from 'lucide-react'

export function DashboardOverview() {
  const stats = [
    {
      title: 'Active AI Models',
      value: '8',
      change: '+2',
      icon: Brain,
      description: 'Neural networks online'
    },
    {
      title: 'Tasks Completed',
      value: '1,247',
      change: '+127',
      icon: Activity,
      description: 'Last 24 hours'
    },
    {
      title: 'Active Agents',
      value: '12',
      change: '+3',
      icon: Bot,
      description: 'Specialized AI agents'
    },
    {
      title: 'API Requests',
      value: '45.2K',
      change: '+5.2K',
      icon: Zap,
      description: 'This month'
    }
  ]

  const systems = [
    {
      name: 'HAM Memory System',
      status: 'online',
      description: 'Hierarchical Abstract Memory',
      icon: Database
    },
    {
      name: 'HSP Protocol',
      status: 'online',
      description: 'Heterogeneous Service Protocol',
      icon: Activity
    },
    {
      name: 'Neural Network Core',
      status: 'online',
      description: 'Deep learning engine',
      icon: Brain
    },
    {
      name: 'Agent Manager',
      status: 'online',
      description: 'Multi-agent coordination',
      icon: Bot
    },
    {
      name: 'Project Coordinator',
      status: 'online',
      description: 'Task orchestration',
      icon: Cpu
    },
    {
      name: 'Learning Manager',
      status: 'training',
      description: 'Self-improvement system',
      icon: TrendingUp
    }
  ]

  const recentActivity = [
    {
      type: 'chat',
      message: 'AI Chat session completed',
      time: '2 minutes ago',
      icon: MessageSquare
    },
    {
      type: 'image',
      message: 'Image generated: "Abstract landscape"',
      time: '5 minutes ago',
      icon: ImageIcon
    },
    {
      type: 'search',
      message: 'Web search: "Latest AI developments"',
      time: '8 minutes ago',
      icon: Search
    },
    {
      type: 'code',
      message: 'Code analysis: React optimization',
      time: '12 minutes ago',
      icon: Code
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Unified Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive AI system overview and management
          </p>
        </div>
        <Button>
          <Zap className="mr-2 h-4 w-4" />
          System Status
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="py-2 gap-2">
              <CardContent className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold leading-none">{stat.value}</p>
                  </div>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">{stat.change}</span> {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* System Status */}
        <div className="border rounded-lg bg-card">
          <div className="px-3 py-2 border-b bg-muted/30">
            <div className="text-sm font-medium">System Components</div>
            <div className="text-xs text-muted-foreground">Core AI systems and their current status</div>
          </div>
          <div className="divide-y">
            {systems.map((system) => {
              const Icon = system.icon
              return (
                <div key={system.name} className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{system.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {system.description}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={system.status === 'online' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {system.status}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border rounded-lg bg-card">
          <div className="px-3 py-2 border-b bg-muted/30">
            <div className="text-sm font-medium">Recent Activity</div>
            <div className="text-xs text-muted-foreground">Latest AI system interactions</div>
          </div>
          <div className="divide-y">
            {recentActivity.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.time} className="flex items-center space-x-3 px-3 py-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border rounded-lg bg-card">
        <div className="px-3 py-2 border-b bg-muted/30">
          <div className="text-sm font-medium">Quick Actions</div>
          <div className="text-xs text-muted-foreground">Common AI system operations</div>
        </div>
        <div className="px-3 py-2">
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start h-8 text-sm">
              <MessageSquare className="mr-2 h-3 w-3" />
              Start Chat
            </Button>
            <Button variant="outline" className="justify-start h-8 text-sm">
              <ImageIcon className="mr-2 h-3 w-3" />
              Generate Image
            </Button>
            <Button variant="outline" className="justify-start h-8 text-sm">
              <Search className="mr-2 h-3 w-3" />
              Web Search
            </Button>
            <Button variant="outline" className="justify-start h-8 text-sm">
              <Code className="mr-2 h-3 w-3" />
              Analyze Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}