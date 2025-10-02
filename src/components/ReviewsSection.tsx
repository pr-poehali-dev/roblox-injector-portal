import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  game: string;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Александр К.",
      rating: 5,
      text: "Лучший инжектор для Blox Fruits! Авто-фарм работает идеально, за 3 дня прокачался до макс уровня.",
      date: "2 дня назад",
      game: "Blox Fruits"
    },
    {
      id: 2,
      name: "Мария С.",
      rating: 4,
      text: "Скрипты для Murder Mystery 2 огонь! ESP показывает всё. Минус только в том что ключ надо обновлять каждый день.",
      date: "5 дней назад",
      game: "Murder Mystery 2"
    },
    {
      id: 3,
      name: "Дмитрий В.",
      rating: 5,
      text: "Пользуюсь больше месяца, ни одного бана. Скрипты регулярно обновляются. Рекомендую!",
      date: "1 неделю назад",
      game: "Arsenal"
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: '',
    game: ''
  });
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.text || !newReview.game) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text,
      date: "Только что",
      game: newReview.game
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, text: '', game: '' });
    setIsOpen(false);

    toast({
      title: "Спасибо за отзыв!",
      description: "Ваш отзыв успешно добавлен",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
      />
    ));
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-rajdhani font-bold mb-4">Отзывы пользователей</h3>
        <p className="text-muted-foreground">Что говорят те, кто уже использует наши скрипты</p>
      </div>

      <div className="max-w-5xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-rajdhani font-semibold text-lg">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{review.text}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Gamepad2" size={14} className="text-primary" />
                  <span className="text-primary">{review.game}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Icon name="MessageSquarePlus" size={20} />
                Оставить отзыв
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl font-rajdhani">Оставить отзыв</DialogTitle>
                <DialogDescription>Расскажите о вашем опыте использования наших скриптов</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                  <Input
                    placeholder="Например: Александр К."
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Игра</label>
                  <Input
                    placeholder="Например: Blox Fruits"
                    value={newReview.game}
                    onChange={(e) => setNewReview({ ...newReview, game: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Оценка</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={28}
                          className={star <= newReview.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваш отзыв</label>
                  <Textarea
                    placeholder="Поделитесь своим опытом использования скриптов..."
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    rows={4}
                  />
                </div>
                <Button onClick={handleSubmitReview} className="w-full">
                  Отправить отзыв
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
