import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, X, DollarSign, TrendingUp, AlertCircle, CheckCircle, Music } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
}

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Payment Received',
      message: 'Spotify payout of $847.32 has been processed',
      time: '2 hours ago',
      read: false,
      icon: DollarSign
    },
    {
      id: '2',
      type: 'info',
      title: 'Recoupment Milestone',
      message: 'Your latest release has reached 75% recoupment',
      time: '1 day ago',
      read: false,
      icon: TrendingUp
    },
    {
      id: '3',
      type: 'warning',
      title: 'Contract Expiring',
      message: 'Distribution agreement expires in 30 days',
      time: '2 days ago',
      read: true,
      icon: AlertCircle
    },
    {
      id: '4',
      type: 'success',
      title: 'New Release Live',
      message: 'Your track "Midnight Dreams" is now live on all platforms',
      time: '3 days ago',
      read: true,
      icon: Music
    },
    {
      id: '5',
      type: 'info',
      title: 'Analytics Update',
      message: 'Monthly streaming report is now available',
      time: '1 week ago',
      read: true,
      icon: CheckCircle
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500 bg-green-500/10';
      case 'warning': return 'text-yellow-500 bg-yellow-500/10';
      case 'error': return 'text-red-500 bg-red-500/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-white flex items-center justify-center font-medium"
            >
              {unreadCount}
            </motion.span>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-80 p-0 glass-effect border-border/50 shadow-xl" 
        align="end"
        sideOffset={8}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-6">
                Mark all read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <ScrollArea className="max-h-96">
            <div className="p-2">
              <AnimatePresence>
                {notifications.slice(0, 5).map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative p-3 rounded-lg border transition-all duration-200 cursor-pointer group mb-2 ${
                      notification.read 
                        ? 'bg-muted/30 border-border/30' 
                        : 'bg-card border-primary/20 shadow-sm'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-lg ${getTypeColor(notification.type)} flex-shrink-0`}>
                        <notification.icon className="h-3 w-3" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-xs truncate">{notification.title}</h4>
                          {!notification.read && (
                            <div className="h-1.5 w-1.5 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 p-0 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    {!notification.read && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-l-lg"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {notifications.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-muted-foreground"
                >
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications yet</p>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-border/50">
              <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                View all notifications
              </Button>
            </div>
          )}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}