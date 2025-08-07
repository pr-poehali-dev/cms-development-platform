import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

interface Template {
  id: string;
  name: string;
  image: string;
  description: string;
  colors: string[];
}

interface DragItem {
  id: string;
  type: 'text' | 'image' | 'button' | 'product' | 'gallery';
  content: string;
  style?: Record<string, any>;
}

interface Calculator {
  balloonType: string;
  quantity: number;
  complexity: string;
  duration: string;
}

export default function Index() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [dragItems, setDragItems] = useState<DragItem[]>([]);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Воздушные шары "Сердца"',
      price: 350,
      image: '/img/127478f6-68fe-4ed0-918f-a0ca5114cae5.jpg',
      category: 'romantic',
      description: 'Романтический набор красных шаров-сердец',
      inStock: true
    },
    {
      id: '2',
      name: 'Букет "Детский праздник"',
      price: 1200,
      image: '/img/b810be65-fbd9-43fd-b00d-cd09880a924f.jpg',
      category: 'kids',
      description: 'Яркий букет для детских праздников',
      inStock: true
    }
  ]);
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

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Современный',
      image: '/img/127478f6-68fe-4ed0-918f-a0ca5114cae5.jpg',
      description: 'Минималистичный дизайн с акцентом на товары',
      colors: ['#87CEEB', '#FF6B6B', '#4169E1']
    },
    {
      id: 'festive',
      name: 'Праздничный',
      image: '/img/b810be65-fbd9-43fd-b00d-cd09880a924f.jpg',
      description: 'Яркий и веселый дизайн для детских праздников',
      colors: ['#FFD700', '#FF69B4', '#00CED1']
    },
    {
      id: 'elegant',
      name: 'Элегантный',
      image: '/img/2191fa75-1da2-43c3-8e79-41e4278258a9.jpg',
      description: 'Изысканный дизайн для особых событий',
      colors: ['#DDA0DD', '#B0C4DE', '#F0E68C']
    }
  ];

  const components = [
    { type: 'text', icon: 'Type', label: 'Текст' },
    { type: 'image', icon: 'Image', label: 'Изображение' },
    { type: 'button', icon: 'MousePointer', label: 'Кнопка' },
    { type: 'product', icon: 'ShoppingBag', label: 'Товар' },
    { type: 'gallery', icon: 'Grid3x3', label: 'Галерея' }
  ];

  const projectStats = [
    { name: 'Свадебные букеты', value: 45, color: '#FF6B6B' },
    { name: 'Корпоративные события', value: 30, color: '#4169E1' },
    { name: 'Детские праздники', value: 25, color: '#87CEEB' }
  ];

  const handleDragStart = (e: React.DragEvent, itemType: string) => {
    setIsDragging(itemType);
    e.dataTransfer.setData('text/plain', itemType);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const itemType = e.dataTransfer.getData('text/plain') as DragItem['type'];
    
    const newItem: DragItem = {
      id: Date.now().toString(),
      type: itemType,
      content: itemType === 'text' ? 'Введите текст...' : 
               itemType === 'button' ? 'Кнопка' :
               itemType === 'product' ? 'Товар' :
               itemType === 'gallery' ? 'Галерея' : 'Изображение'
    };
    
    setDragItems(prev => [...prev, newItem]);
    setIsDragging(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeItem = (id: string) => {
    setDragItems(prev => prev.filter(item => item.id !== id));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: Date.now().toString() }]);
  };

  const renderPreviewItem = (item: DragItem) => {
    switch (item.type) {
      case 'text':
        return (
          <div className="p-4 border border-dashed border-sky-blue/50 rounded-lg bg-white/50">
            <p className="text-slate-dark">{item.content}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeItem(item.id)}
              className="absolute top-1 right-1 h-6 w-6 p-0"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        );
      case 'image':
        return (
          <div className="relative p-4 border border-dashed border-sky-blue/50 rounded-lg bg-white/50">
            <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
              <Icon name="Image" className="text-gray-400" size={32} />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeItem(item.id)}
              className="absolute top-1 right-1 h-6 w-6 p-0"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        );
      case 'button':
        return (
          <div className="relative p-4 border border-dashed border-sky-blue/50 rounded-lg bg-white/50">
            <Button className="bg-balloon-red hover:bg-balloon-red/90">
              {item.content}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeItem(item.id)}
              className="absolute top-1 right-1 h-6 w-6 p-0"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        );
      case 'product':
        const product = products[0];
        return (
          <div className="relative p-4 border border-dashed border-sky-blue/50 rounded-lg bg-white/50">
            <Card className="w-full max-w-sm">
              <CardContent className="p-4">
                <img src={product?.image} alt={product?.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                <h3 className="font-semibold">{product?.name}</h3>
                <p className="text-balloon-red font-bold">₽{product?.price}</p>
              </CardContent>
            </Card>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeItem(item.id)}
              className="absolute top-1 right-1 h-6 w-6 p-0"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        );
      case 'gallery':
        return (
          <div className="relative p-4 border border-dashed border-sky-blue/50 rounded-lg bg-white/50">
            <div className="grid grid-cols-3 gap-2">
              {products.slice(0, 3).map((product, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded">
                  <img src={product.image} alt="" className="w-full h-full object-cover rounded" />
                </div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeItem(item.id)}
              className="absolute top-1 right-1 h-6 w-6 p-0"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud-white via-white to-sky-blue/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-blue to-alice-blue flex items-center justify-center">
                <Icon name="Paintbrush" className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-dark">BalloonBuilder</h1>
                <p className="text-sm text-gray-600">Конструктор сайтов для аэродизайнеров</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-alice-blue/20">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Админка
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Управление товарами</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-alice-blue hover:bg-alice-blue/90 text-white">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Добавить товар
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Новый товар</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Название товара</Label>
                            <Input placeholder="Введите название" />
                          </div>
                          <div>
                            <Label>Цена</Label>
                            <Input type="number" placeholder="0" />
                          </div>
                          <div>
                            <Label>Категория</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите категорию" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="romantic">Романтические</SelectItem>
                                <SelectItem value="kids">Детские</SelectItem>
                                <SelectItem value="corporate">Корпоративные</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Описание</Label>
                            <Textarea placeholder="Описание товара" />
                          </div>
                          <Button className="w-full">Сохранить</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <div className="space-y-3">
                      {products.map((product) => (
                        <Card key={product.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                              <div className="flex-1">
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-600">₽{product.price}</p>
                              </div>
                              <Badge variant={product.inStock ? "default" : "destructive"}>
                                {product.inStock ? 'В наличии' : 'Нет в наличии'}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button className="bg-alice-blue hover:bg-alice-blue/90 text-white">
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="templates" className="data-[state=active]:bg-sky-blue data-[state=active]:text-white">
              <Icon name="Layout" size={16} className="mr-2" />
              Шаблоны
            </TabsTrigger>
            <TabsTrigger value="builder" className="data-[state=active]:bg-sky-blue data-[state=active]:text-white">
              <Icon name="Paintbrush" size={16} className="mr-2" />
              Конструктор
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-sky-blue data-[state=active]:text-white">
              <Icon name="Eye" size={16} className="mr-2" />
              Превью
            </TabsTrigger>
          </TabsList>

          {/* Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-dark mb-2">Выберите шаблон</h2>
              <p className="text-gray-600">Готовые дизайны для интернет-магазинов воздушных шаров</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTemplate === template.id ? 'ring-2 ring-alice-blue' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-0">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {template.colors.map((color, index) => (
                            <div 
                              key={index}
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        
                        {selectedTemplate === template.id && (
                          <Badge className="bg-alice-blue text-white">
                            <Icon name="Check" size={12} className="mr-1" />
                            Выбран
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedTemplate && (
              <div className="text-center">
                <Button 
                  className="bg-gradient-to-r from-sky-blue to-alice-blue text-white hover:from-sky-blue/90 hover:to-alice-blue/90"
                  size="lg"
                >
                  <Icon name="ArrowRight" size={16} className="mr-2" />
                  Начать редактирование
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Builder */}
          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[600px]">
              {/* Components Panel */}
              <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Layers" className="mr-2 text-sky-blue" />
                    Элементы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {components.map((component) => (
                      <div 
                        key={component.type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, component.type)}
                        className="p-3 border border-gray-200 rounded-lg cursor-grab hover:border-sky-blue hover:bg-sky-blue/5 transition-colors active:cursor-grabbing"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name={component.icon as any} size={16} className="text-gray-600" />
                          <span className="text-sm">{component.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Canvas */}
              <Card className="lg:col-span-4 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon name="Smartphone" className="mr-2 text-balloon-red" />
                      Холст редактирования
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
                  <div 
                    className="min-h-[400px] bg-gradient-to-br from-sky-blue/5 to-alice-blue/5 rounded-lg border-2 border-dashed border-gray-200 p-4"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    {dragItems.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <Icon name="MousePointer" size={48} className="mx-auto mb-4" />
                          <p className="text-lg">Перетащите элементы сюда</p>
                          <p className="text-sm">Создайте свой уникальный дизайн</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {dragItems.map((item) => (
                          <div key={item.id} className="relative">
                            {renderPreviewItem(item)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preview */}
          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon name="Eye" className="mr-2 text-alice-blue" />
                    Предпросмотр сайта
                  </div>
                  <Button className="bg-gradient-to-r from-sky-blue to-alice-blue text-white">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Опубликовать
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg border overflow-hidden">
                  {/* Mock Website */}
                  <div className="bg-gradient-to-r from-sky-blue to-alice-blue text-white p-6 text-center">
                    <h1 className="text-3xl font-bold mb-2">Магазин воздушных шаров</h1>
                    <p className="text-sky-blue/20">Превращаем ваши праздники в сказку</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <Card key={product.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-lg mb-3"
                            />
                            <h3 className="font-semibold mb-1">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-balloon-red">₽{product.price}</span>
                              <Button size="sm" className="bg-alice-blue hover:bg-alice-blue/90 text-white">
                                В корзину
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}