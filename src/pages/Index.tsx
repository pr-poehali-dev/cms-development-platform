import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Calculator {
  balloonType: string;
  quantity: number;
  complexity: string;
  duration: string;
}

export default function Index() {
  const [calculator, setCalculator] = useState<Calculator>({
    balloonType: '',
    quantity: 0,
    complexity: '',
    duration: ''
  });

  const calculatePrice = () => {
    const basePrice = calculator.balloonType === 'latex' ? 50 : 
                     calculator.balloonType === 'foil' ? 120 : 200;
    const complexityMultiplier = calculator.complexity === 'simple' ? 1 : 
                               calculator.complexity === 'medium' ? 1.5 : 2;
    const durationMultiplier = calculator.duration === 'hour' ? 1 : 
                              calculator.duration === 'day' ? 2 : 3;
    
    return Math.round(basePrice * calculator.quantity * complexityMultiplier * durationMultiplier);
  };

  const analyticsData = [
    { label: 'Активные проекты', value: 24, change: '+12%', color: 'bg-sky-blue' },
    { label: 'Завершенные заказы', value: 156, change: '+8%', color: 'bg-balloon-red' },
    { label: 'Новые клиенты', value: 18, change: '+25%', color: 'bg-alice-blue' },
    { label: 'Средний чек', value: '₽8,450', change: '+15%', color: 'bg-green-500' }
  ];

  const projectStats = [
    { name: 'Свадебные букеты', value: 45, color: '#FF6B6B' },
    { name: 'Корпоративные события', value: 30, color: '#4169E1' },
    { name: 'Детские праздники', value: 25, color: '#87CEEB' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud-white via-white to-sky-blue/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-blue to-alice-blue flex items-center justify-center">
                <Icon name="Zap" className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-dark">AeroDesigner CMS</h1>
                <p className="text-sm text-gray-600">Платформа для аэродизайнеров</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-sky-blue/10 text-alice-blue border-sky-blue/20">
                <Icon name="Sparkles" size={14} className="mr-1" />
                Pro версия
              </Badge>
              <Button className="bg-alice-blue hover:bg-alice-blue/90 text-white">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-sky-blue data-[state=active]:text-white">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-sky-blue data-[state=active]:text-white">
              <Icon name="FileText" size={16} className="mr-2" />
              Контент
            </TabsTrigger>
            <TabsTrigger value="builder" className="data-[state=active]:bg-sky-blue data-[state=active]:text-white">
              <Icon name="Layout" size={16} className="mr-2" />
              Конструктор
            </TabsTrigger>
            <TabsTrigger value="calculator" className="data-[state=active]:bg-sky-blue data-[state=active]:text-white">
              <Icon name="Calculator" size={16} className="mr-2" />
              Калькулятор
            </TabsTrigger>
          </TabsList>

          {/* Analytics Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsData.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{item.label}</p>
                        <p className="text-2xl font-bold text-slate-dark">{item.value}</p>
                        <p className="text-sm text-green-600 font-medium">{item.change}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl ${item.color} opacity-20 flex items-center justify-center`}>
                        <div className={`w-6 h-6 rounded-lg ${item.color}`}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="TrendingUp" className="mr-2 text-alice-blue" />
                    Статистика проектов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectStats.map((project, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{project.name}</span>
                          <span className="text-sm text-gray-600">{project.value}%</span>
                        </div>
                        <Progress value={project.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Calendar" className="mr-2 text-balloon-red" />
                    Ближайшие события
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-sky-blue/10">
                      <div className="w-2 h-2 bg-balloon-red rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Свадьба Анны и Павла</p>
                        <p className="text-sm text-gray-600">15 августа, 14:00</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-alice-blue/10">
                      <div className="w-2 h-2 bg-alice-blue rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Корпоратив Tech Solutions</p>
                        <p className="text-sm text-gray-600">18 августа, 18:00</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-500/10">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">День рождения Маши</p>
                        <p className="text-sm text-gray-600">22 августа, 16:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="FileText" className="mr-2 text-sky-blue" />
                    Страницы сайта
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                      <span>Главная</span>
                      <Badge className="bg-green-100 text-green-800">Опубликовано</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                      <span>О нас</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Черновик</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                      <span>Портфолио</span>
                      <Badge className="bg-green-100 text-green-800">Опубликовано</Badge>
                    </div>
                    <Button className="w-full mt-4 bg-sky-blue hover:bg-sky-blue/90">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить страницу
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Image" className="mr-2 text-balloon-red" />
                    Медиа файлы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon name="Image" className="text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon name="Video" className="text-gray-400" />
                    </div>
                  </div>
                  <Button className="w-full bg-balloon-red hover:bg-balloon-red/90 text-white">
                    <Icon name="Upload" size={16} className="mr-2" />
                    Загрузить файлы
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Users" className="mr-2 text-alice-blue" />
                    Пользователи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-sky-blue/20 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-sky-blue" />
                      </div>
                      <div>
                        <p className="font-medium">Администратор</p>
                        <p className="text-sm text-gray-600">admin@aero.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-balloon-red/20 rounded-full flex items-center justify-center">
                        <Icon name="UserCheck" size={16} className="text-balloon-red" />
                      </div>
                      <div>
                        <p className="font-medium">Дизайнер</p>
                        <p className="text-sm text-gray-600">designer@aero.com</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-alice-blue hover:bg-alice-blue/90 text-white">
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Пригласить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Site Builder */}
          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Layers" className="mr-2 text-sky-blue" />
                    Компоненты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Заголовок', icon: 'Type' },
                      { name: 'Изображение', icon: 'Image' },
                      { name: 'Кнопка', icon: 'MousePointer' },
                      { name: 'Галерея', icon: 'Grid3x3' },
                      { name: 'Контакты', icon: 'Phone' },
                      { name: 'Карта', icon: 'MapPin' }
                    ].map((component, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-sky-blue hover:bg-sky-blue/5 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Icon name={component.icon as any} size={16} className="text-gray-600" />
                          <span className="text-sm">{component.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon name="Smartphone" className="mr-2 text-balloon-red" />
                      Предпросмотр сайта
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Smartphone" size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Tablet" size={16} />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-alice-blue/10">
                        <Icon name="Monitor" size={16} />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/10] bg-gradient-to-br from-sky-blue/10 to-alice-blue/10 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
                    <img 
                      src="/img/2191fa75-1da2-43c3-8e79-41e4278258a9.jpg" 
                      alt="Balloon background" 
                      className="w-full h-32 object-cover rounded-lg mb-4 opacity-50"
                    />
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-slate-dark mb-2">Аэродизайн студия</h3>
                      <p className="text-gray-600 mb-4">Превращаем ваши праздники в сказку</p>
                      <Button className="bg-balloon-red hover:bg-balloon-red/90 text-white">
                        Заказать консультацию
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Price Calculator */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Calculator" className="mr-2 text-sky-blue" />
                    Калькулятор стоимости
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="balloon-type">Тип шаров</Label>
                    <Select value={calculator.balloonType} onValueChange={(value) => setCalculator({...calculator, balloonType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип шаров" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latex">Латексные (₽50 за шт.)</SelectItem>
                        <SelectItem value="foil">Фольгированные (₽120 за шт.)</SelectItem>
                        <SelectItem value="custom">Кастомные (₽200 за шт.)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Количество шаров</Label>
                    <Input 
                      id="quantity"
                      type="number"
                      value={calculator.quantity}
                      onChange={(e) => setCalculator({...calculator, quantity: parseInt(e.target.value) || 0})}
                      placeholder="Введите количество"
                    />
                  </div>

                  <div>
                    <Label htmlFor="complexity">Сложность композиции</Label>
                    <Select value={calculator.complexity} onValueChange={(value) => setCalculator({...calculator, complexity: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите сложность" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Простая (x1)</SelectItem>
                        <SelectItem value="medium">Средняя (x1.5)</SelectItem>
                        <SelectItem value="complex">Сложная (x2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Продолжительность работы</Label>
                    <Select value={calculator.duration} onValueChange={(value) => setCalculator({...calculator, duration: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">1 час (x1)</SelectItem>
                        <SelectItem value="day">Полный день (x2)</SelectItem>
                        <SelectItem value="event">Многодневное событие (x3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-sky-blue/10 to-alice-blue/10 border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Receipt" className="mr-2 text-balloon-red" />
                    Расчет стоимости
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-slate-dark mb-2">
                        ₽{calculatePrice().toLocaleString()}
                      </div>
                      <p className="text-gray-600">Итоговая стоимость</p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Тип шаров:</span>
                        <span className="font-medium">
                          {calculator.balloonType === 'latex' ? 'Латексные' :
                           calculator.balloonType === 'foil' ? 'Фольгированные' :
                           calculator.balloonType === 'custom' ? 'Кастомные' : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Количество:</span>
                        <span className="font-medium">{calculator.quantity} шт.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Сложность:</span>
                        <span className="font-medium">
                          {calculator.complexity === 'simple' ? 'Простая' :
                           calculator.complexity === 'medium' ? 'Средняя' :
                           calculator.complexity === 'complex' ? 'Сложная' : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Время работы:</span>
                        <span className="font-medium">
                          {calculator.duration === 'hour' ? '1 час' :
                           calculator.duration === 'day' ? 'Полный день' :
                           calculator.duration === 'event' ? 'Многодневное' : '-'}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-sky-blue to-alice-blue text-white hover:from-sky-blue/90 hover:to-alice-blue/90">
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить предложение
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}