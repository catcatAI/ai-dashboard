'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  Clock, 
  Activity,
  Target,
  Database,
  Cpu,
  Brain,
  MessageSquare,
  Image as ImageIcon,
  Search,
  Code,
  Github,
  Monitor
} from 'lucide-react'

interface UsageMetric {
  name: string
  value: number
  change: number
  unit: string
  icon: any
  color: string
}

interface PerformanceData {
  timestamp: string
  requests: number
  responseTime: number
  successRate: number
}

interface ModelUsage {
  model: string
  usage: number
  cost: number
  requests: number
  avgResponseTime: number
}

interface UserActivity {
  hour: string
  activeUsers: number
  requests: number
}

interface TopFeature {
  name: string
  usage: number
  icon: any
  color: string
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d')
  const [isLoading, setIsLoading] = useState(false)

  const usageMetrics: UsageMetric[] = [
    {
      name: 'Total API Calls',
      value: 1247392,
      change: 12.5,
      unit: 'calls',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      name: 'Active Users',
      value: 847,
      change: 8.2,
      unit: 'users',
      icon: Users,
      color: 'text-green-600'
    },
    {
      name: 'Avg Response Time',
      value: 245,
      change: -15.3,
      unit: 'ms',
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      name: 'Success Rate',
      value: 99.2,
      change: 0.8,
      unit: '%',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      name: 'Data Processed',
      value: 2.4,
      change: 23.1,
      unit: 'TB',
      icon: Database,
      color: 'text-indigo-600'
    },
    {
      name: 'CPU Usage',
      value: 67,
      change: -5.2,
      unit: '%',
      icon: Cpu,
      color: 'text-red-600'
    }
  ]

  const performanceData: PerformanceData[] = [
    { timestamp: '00:00', requests: 1200, responseTime: 280, successRate: 98.5 },
    { timestamp: '04:00', requests: 800, responseTime: 220, successRate: 99.1 },
    { timestamp: '08:00', requests: 3500, responseTime: 260, successRate: 99.3 },
    { timestamp: '12:00', requests: 5200, responseTime: 240, successRate: 99.0 },
    { timestamp: '16:00', requests: 4800, responseTime: 250, successRate: 99.2 },
    { timestamp: '20:00', requests: 2800, responseTime: 230, successRate: 99.4 },
    { timestamp: '24:00', requests: 1500, responseTime: 270, successRate: 98.8 }
  ]

  const modelUsage: ModelUsage[] = [
    { model: 'GPT-4', usage: 45, cost: 2340, requests: 561234, avgResponseTime: 280 },
    { model: 'Claude', usage: 25, cost: 1250, requests: 311845, avgResponseTime: 320 },
    { model: 'Gemini', usage: 20, cost: 980, requests: 249476, avgResponseTime: 200 },
    { model: 'Custom Models', usage: 10, cost: 450, requests: 124837, avgResponseTime: 180 }
  ]

  const userActivity: UserActivity[] = [
    { hour: '00:00', activeUsers: 120, requests: 1200 },
    { hour: '04:00', activeUsers: 80, requests: 800 },
    { hour: '08:00', activeUsers: 350, requests: 3500 },
    { hour: '12:00', activeUsers: 520, requests: 5200 },
    { hour: '16:00', activeUsers: 480, requests: 4800 },
    { hour: '20:00', activeUsers: 280, requests: 2800 },
    { hour: '24:00', activeUsers: 150, requests: 1500 }
  ]

  const topFeatures: TopFeature[] = [
    { name: 'AI Chat', usage: 35, icon: MessageSquare, color: 'bg-blue-500' },
    { name: 'Image Generation', usage: 25, icon: ImageIcon, color: 'bg-green-500' },
    { name: 'Web Search', usage: 20, icon: Search, color: 'bg-yellow-500' },
    { name: 'Code Analysis', usage: 15, icon: Code, color: 'bg-purple-500' },
    { name: 'AI Agents', usage: 3, icon: Brain, color: 'bg-indigo-500' },
    { name: 'GitHub Connect', usage: 2, icon: Github, color: 'bg-red-500' }
  ]

  const handleExportReport = async () => {
    setIsLoading(true)
    // Simulate report generation
    setTimeout(() => {
      setIsLoading(false)
      alert('Analytics report exported successfully!')
    }, 2000)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatChange = (change: number) => {
    const isPositive = change > 0
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
        {isPositive ? '+' : ''}{change.toFixed(1)}%
      </span>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive usage metrics and performance analytics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportReport} disabled={isLoading}>
            <BarChart3 className="mr-2 h-4 w-4" />
            {isLoading ? 'Exporting...' : 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {usageMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.name} className="py-2 gap-2">
              <CardContent className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.name}
                    </p>
                    <p className="text-2xl font-bold leading-none">
                      {formatNumber(metric.value)} {metric.unit}
                    </p>
                  </div>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatChange(metric.change)} from last period
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
          <TabsTrigger value="models">Model Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Features */}
            <Card className="py-3 gap-3">
              <CardHeader className="px-4 py-3">
                <CardTitle>Top Features</CardTitle>
                <CardDescription>
                  Most used AI dashboard features
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-3 space-y-3">
                {topFeatures.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${feature.color}`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{feature.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={feature.usage} className="w-20" />
                        <span className="text-sm text-muted-foreground">
                          {feature.usage}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* User Activity */}
            <Card className="py-3 gap-3">
              <CardHeader className="px-4 py-3">
                <CardTitle>User Activity</CardTitle>
                <CardDescription>
                  Active users and requests over time
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-3 space-y-3">
                <div className="space-y-4">
                  {userActivity.map((activity) => (
                    <div key={activity.hour} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{activity.hour}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{activity.activeUsers}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{formatNumber(activity.requests)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="py-3 gap-3">
            <CardHeader className="px-4 py-3">
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                System performance and response times
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-3 space-y-3">
              <div className="space-y-4">
                {performanceData.map((data) => (
                  <div key={data.timestamp} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{data.timestamp}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Requests</p>
                      <p className="font-medium">{formatNumber(data.requests)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="font-medium">{data.responseTime}ms</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="font-medium">{data.successRate}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="py-3 gap-3">
              <CardHeader className="px-4 py-3">
                <CardTitle>Usage by Time of Day</CardTitle>
                <CardDescription>
                  Peak usage hours and patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-3 space-y-2">
                <div className="space-y-2">
                  {userActivity.map((activity) => (
                    <div key={activity.hour} className="flex items-center justify-between">
                      <span className="text-sm">{activity.hour}</span>
                      <div className="flex items-center space-x-2">
                        <Progress 
                          value={(activity.requests / Math.max(...userActivity.map(a => a.requests))) * 100} 
                          className="w-24" 
                        />
                        <span className="text-sm text-muted-foreground">
                          {formatNumber(activity.requests)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="py-3 gap-3">
              <CardHeader className="px-4 py-3">
                <CardTitle>Feature Distribution</CardTitle>
                <CardDescription>
                  Usage distribution across features
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-3 space-y-3">
                <div className="space-y-4">
                  {topFeatures.map((feature) => (
                    <div key={feature.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{feature.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {feature.usage}%
                        </span>
                      </div>
                      <Progress value={feature.usage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card className="py-3 gap-3">
            <CardHeader className="px-4 py-3">
              <CardTitle>Model Usage Analytics</CardTitle>
              <CardDescription>
                AI model usage, costs, and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-3 space-y-3">
              <div className="space-y-4">
                {modelUsage.map((model) => (
                  <div key={model.model} className="grid grid-cols-5 gap-4 p-4 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{model.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Usage</p>
                      <p className="font-medium">{model.usage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cost</p>
                      <p className="font-medium">${model.cost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Requests</p>
                      <p className="font-medium">{formatNumber(model.requests)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response</p>
                      <p className="font-medium">{model.avgResponseTime}ms</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}