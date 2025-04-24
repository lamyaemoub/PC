import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Sparkles, Users2, Target, Zap } from "lucide-react";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    id: string;
    title: string;
    icon: "ai" | "scale" | "qualification" | "conversion";
    description: string;
    benefits: string[];
    examples: string[];
  };
}

const FeatureIcons = {
  ai: Sparkles,
  scale: Users2,
  qualification: Target,
  conversion: Zap,
};

export function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  const Icon = FeatureIcons[feature.icon];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Icon className="h-6 w-6 text-primary" />
            </motion.div>
            {feature.title}
          </DialogTitle>
          <DialogDescription className="text-lg mt-4">
            {feature.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Benefits</h3>
            <ul className="list-disc pl-5 space-y-2">
              {feature.benefits.map((benefit: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Use Cases</h3>
            <ul className="list-disc pl-5 space-y-2">
              {feature.examples.map((example: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {example}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}