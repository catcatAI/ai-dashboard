'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Activity, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Wifi,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Database,
  Network,
  Thermometer,
  Gauge,
  BarChart3,
  RefreshCw
} from 'lucide-react'

interface SystemMetric {
  name: string
  value: number
  max: number
  unit: string
  status: 'normal' | 'warning' | 'critical'
  icon: any
}

interface ServiceStatus {
  name: string
  status: 'running' | 'stopped' | 'error'
  cpu: number
  memory: number
  uptime: string
  lastCheck: Date
}

export function SystemMonitor() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    {
      name: 'CPU Usage',
      value: 45,
      max: 100,
      unit: '%',
      status: 'normal',
      icon: Cpu
    },
    {
      name: 'Memory',
      value: 67,
      max: 100,
      unit: '%',
      status: 'normal',
      icon: MemoryStick
    },
    {
      name: 'Storage',
      value: 82,
      max: 100,
      unit: '%',
      status: 'warning',
      icon: HardDrive
    },
    {
      name: 'Network',
      value: 23,
      max: 100,
      unit: '%',
      status: 'normal',
      icon: Wifi
    },
    {
      name: 'Temperature',
      value: 68,
      max: 100,
      unit: '°C',
      status: 'normal',
      icon: Thermometer
    }
  ])

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'HAM Memory System',
      status: 'running',
      cpu: 12,
      memory: 34,
      uptime: '5d 12h',
      lastCheck: new Date(Date.now() - 30000)
    },
    {
      name: 'HSP Protocol',
      status: 'running',
      cpu: 8,
      memory: 22,
      uptime: '5d 12h',
      lastCheck: new Date(Date.now() - 30000)
    },
    {
      name: 'Neural Network Core',
      status: 'running',
      cpu: 45,
      memory: 67,
      uptime: '3d 8h',
      lastCheck: new Date(Date.now() - 30000)
    },
    {
      name: 'Agent Manager',
      status: 'running',
      cpu: 5,
      memory: 15,
      uptime: '5d 12h',
      lastCheck: new Date(Date.now() - 30000)
    },
    {
      name: 'Learning Manager',
      status: 'running',
      cpu: 28,
      memory: 42,
      uptime: '2d 15h',
      lastCheck: new Date(Date.now() - 30000)
    },
    {
      name: 'API Server',
      status: 'running',
      cpu: 15,
      memory: 28,
      uptime: '5d 12h',
      lastCheck: new Date(Date.now() - 30000)
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'normal':
        return 'text-green-600'
      case 'stopped':
        return 'text-gray-600'
      case 'warning':
        return 'text-yellow-600'
      case 'error':
      case 'critical':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
      case 'normal':
        return <CheckCircle className="h-4 w-4" />
      case 'stopped':
        return <Clock className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'error':
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getProgressColor = (value: number, status: string) => {
    if (status === 'critical') return 'bg-red-500'
    if (status === 'warning') return 'bg-yellow-500'
    if (value > 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleRefresh = () => {
    // Simulate refreshing metrics
    setSystemMetrics(prev => prev.map(metric => ({
      ...metric,
      value: Math.min(metric.max, Math.max(0, metric.value + (Math.random() - 0.5) * 10))
    })))
  }

  const overallHealth = 92 // Calculate based on all services and metrics

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Monitor</h1>
          <p className="text-muted-foreground">
            Real-time system monitoring and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            Health: {overallHealth}%
          </Badge>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="py-2 gap-2">
          <CardContent className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-muted-foreground">System Health</p>
                <p className={`text-2xl font-bold leading-none ${getStatusColor('normal')}`}>
                  {overallHealth}%
                </p>
              </div>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All systems operational
            </p>
          </CardContent>
        </Card>
        
        <Card className="py-2 gap-2">
          <CardContent className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold leading-none">
                  {services.filter(s => s.status === 'running').length} / {services.length}
                </p>
              </div>
              <Server className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Services running
            </p>
          </CardContent>
        </Card>
        
        <Card className="py-2 gap-2">
          <CardContent className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-muted-foreground">CPU Usage</p>
                <p className="text-2xl font-bold leading-none">
                  {systemMetrics.find(m => m.name === 'CPU Usage')?.value || 0}%
                </p>
              </div>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average load
            </p>
          </CardContent>
        </Card>
        
        <Card className="py-2 gap-2">
          <CardContent className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-muted-foreground">Memory Usage</p>
                <p className="text-2xl font-bold leading-none">
                  {systemMetrics.find(m => m.name === 'Memory')?.value || 0}%
                </p>
              </div>
              <MemoryStick className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              RAM utilization
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-3">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {systemMetrics.map((metric) => {
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
                          {metric.value}{metric.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <div className={`flex items-center gap-1 ${getStatusColor(metric.status)}`}>
                          {getStatusIcon(metric.status)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 space-y-1">
                      <Progress 
                        value={(metric.value / metric.max) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {metric.max - metric.value}{metric.unit} available
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-3">
          <div className="border rounded-lg bg-card">
            <div className="px-3 py-2 border-b bg-muted/30">
              <div className="text-sm font-medium">Service Status</div>
              <div className="text-xs text-muted-foreground">Status and resource usage for all system services</div>
            </div>
            <div className="px-3 py-2">
              <div className="divide-y">
                {services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1 ${getStatusColor(service.status)}`}>
                        {getStatusIcon(service.status)}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{service.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Uptime: {service.uptime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">{service.cpu}%</div>
                        <div className="text-xs text-muted-foreground">CPU</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{service.memory}%</div>
                        <div className="text-xs text-muted-foreground">Memory</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          Last check: {formatTime(service.lastCheck)}
                        </div>
                        <Badge variant={service.status === 'running' ? 'default' : 'secondary'} className="text-xs mt-1">
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-3">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-lg bg-card">
              <div className="px-3 py-2 border-b bg-muted/30">
                <div className="text-sm font-medium flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Performance Metrics
                </div>
              </div>
              <div className="px-3 py-2 space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">245ms</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Throughput</span>
                    <span className="text-sm font-medium">1,250 req/s</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Error Rate</span>
                    <span className="text-sm font-medium">0.02%</span>
                  </div>
                  <Progress value={2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Availability</span>
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
              </div>
            </div>

            <div className="border rounded-lg bg-card">
              <div className="px-3 py-2 border-b bg-muted/30">
                <div className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Resource Usage
                </div>
              </div>
              <div className="px-3 py-2 space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Disk I/O</span>
                    <span className="text-sm font-medium">45 MB/s</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Network I/O</span>
                    <span className="text-sm font-medium">125 MB/s</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Database Connections</span>
                    <span className="text-sm font-medium">23/50</span>
                  </div>
                  <Progress value={46} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Active Sessions</span>
                    <span className="text-sm font-medium">156</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}