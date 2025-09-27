import { cn } from "../../lib/utils";
import { Bot, User } from "lucide-react";
import React from "react";

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
}

export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant = "received", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-end gap-2",
        variant === "sent" ? "justify-end" : "justify-start",
        className,
      )}
      {...props}
    />
  ),
);
ChatBubble.displayName = "ChatBubble";

interface ChatBubbleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "bot" | "user";
}

export const ChatBubbleAvatar = React.forwardRef<
  HTMLDivElement,
  ChatBubbleAvatarProps
>(({ className, variant = "bot", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl",
      variant === "bot" 
        ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
      className,
    )}
    {...props}
  >
    {variant === "bot" ? (
      <Bot className="h-4 w-4" />
    ) : (
      <User className="h-4 w-4" />
    )}
  </div>
));
ChatBubbleAvatar.displayName = "ChatBubbleAvatar";

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
  isLoading?: boolean;
}

export const ChatBubbleMessage = React.forwardRef<
  HTMLDivElement,
  ChatBubbleMessageProps
>(({ className, variant = "received", isLoading = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative max-w-[75%] rounded-2xl px-4 py-2.5 text-sm font-medium",
      variant === "sent"
        ? "bg-green-500 text-white ml-auto"
        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700",
      isLoading && "animate-pulse",
      className,
    )}
    {...props}
  >
    {isLoading ? (
      <div className="flex space-x-1">
        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
      </div>
    ) : (
      props.children
    )}
  </div>
));
ChatBubbleMessage.displayName = "ChatBubbleMessage";
