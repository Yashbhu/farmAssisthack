import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Mail, MessageCircle, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export function ShareModal({ isOpen, onClose, shareUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Check out my farming scenario');
    const body = encodeURIComponent(`I've created a farming scenario that might interest you: ${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`Check out my farming scenario: ${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Farming Scenario</DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">Shareable Link</label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={shareUrl}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Share via</label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 flex items-center gap-2"
                onClick={handleEmailShare}
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex items-center gap-2"
                onClick={handleWhatsAppShare}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Anyone with this link can view your farming scenario and recommendations.
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}