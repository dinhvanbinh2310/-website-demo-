'use client';

import React, { useState } from 'react';
import { MessageCircle, X, User, Clock, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Pause, ArrowRight } from 'lucide-react';
import { Conversation, ChatMessage } from './types';

// ✅ Props interface
interface ChatHistoryProps {
    showChatHistory: boolean;
    conversations: Conversation[];
    customerName: string;
    onClose: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
    showChatHistory,
    conversations,
    customerName,
    onClose
}) => {
    const [expandedConversation, setExpandedConversation] = useState<number | null>(null);

    if (!showChatHistory) return null;

    // ✅ Helper functions
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'open': return <AlertCircle className="w-4 h-4 text-green-500" />;
            case 'closed': return <CheckCircle className="w-4 h-4 text-gray-500" />;
            case 'pending': return <Pause className="w-4 h-4 text-yellow-500" />;
            default: return <MessageCircle className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'text-green-600 bg-green-100';
            case 'closed': return 'text-gray-600 bg-gray-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-100';
            case 'medium': return 'text-orange-600 bg-orange-100';
            case 'low': return 'text-blue-600 bg-blue-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'support': return 'Hỗ trợ kỹ thuật';
            case 'sales': return 'Tư vấn bán hàng';
            case 'complaint': return 'Khiếu nại';
            case 'inquiry': return 'Hỏi đáp';
            default: return 'Khác';
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const toggleConversation = (conversationId: number) => {
        setExpandedConversation(
            expandedConversation === conversationId ? null : conversationId
        );
    };

    return (
        <div className="fixed inset-0 bg-neutral-200/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[85vh] overflow-hidden">
                {/* ✅ Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div>
                        <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                            <MessageCircle className="w-6 h-6 text-blue-600" />
                            Lịch sử trò chuyện
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Khách hàng: <strong>{customerName}</strong> • {conversations.length} cuộc trò chuyện
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* ✅ Content */}
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    {conversations.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium">Chưa có cuộc trò chuyện nào</p>
                            <p className="text-sm mt-2">Khách hàng chưa liên hệ với cửa hàng</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {conversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {/* ✅ Conversation Header */}
                                    <div
                                        className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => toggleConversation(conversation.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {getStatusIcon(conversation.status)}
                                                    <h4 className="font-semibold text-gray-800">{conversation.title}</h4>
                                                    {expandedConversation === conversation.id ? (
                                                        <ChevronUp className="w-4 h-4 text-gray-500" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4 text-sm">
                                                    {/* Status */}
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                                                        {conversation.status === 'open' && 'Đang mở'}
                                                        {conversation.status === 'closed' && 'Đã đóng'}
                                                        {conversation.status === 'pending' && 'Đang chờ'}
                                                    </span>

                                                    {/* Priority */}
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(conversation.priority)}`}>
                                                        {conversation.priority === 'high' && 'Cao'}
                                                        {conversation.priority === 'medium' && 'Trung bình'}
                                                        {conversation.priority === 'low' && 'Thấp'}
                                                    </span>

                                                    {/* Category */}
                                                    <span className="text-gray-600">
                                                        {getCategoryLabel(conversation.category)}
                                                    </span>

                                                    {/* Date */}
                                                    <span className="text-gray-500 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {formatTimestamp(conversation.createdAt)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Message Count */}
                                            <div className="text-right">
                                                <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                                                    {conversation.messages.length} tin nhắn
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ✅ Expanded Messages */}
                                    {expandedConversation === conversation.id && (
                                        <div className="border-t bg-white">
                                            <div className="p-4 max-h-80 overflow-y-auto">
                                                <div className="space-y-3">
                                                    {conversation.messages.map((message) => (
                                                        <div
                                                            key={message.id}
                                                            className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                                                        >
                                                            <div
                                                                className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'customer'
                                                                    ? 'bg-gray-100 text-gray-800'
                                                                    : 'bg-blue-500 text-white'
                                                                    }`}
                                                            >
                                                                {/* Message content */}
                                                                <div className="mb-1">
                                                                    {message.messageType === 'image' ? (
                                                                        <div className="flex items-center gap-2 text-sm italic">
                                                                            <span>📷</span>
                                                                            <span>{message.message}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <p className="text-sm">{message.message}</p>
                                                                    )}
                                                                </div>

                                                                {/* Message metadata */}
                                                                <div className={`flex items-center justify-between text-xs mt-2 ${message.sender === 'customer' ? 'text-gray-500' : 'text-blue-100'
                                                                    }`}>
                                                                    <span>
                                                                        {message.sender === 'customer' ? 'Khách hàng' : message.staffName || 'Nhân viên'}
                                                                    </span>
                                                                    <span>{formatTimestamp(message.timestamp)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* ✅ Quick Info */}
                                                <div className="mt-4 pt-3 border-t bg-gray-50 -mx-4 px-4 py-2">
                                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                                        <span>Cuộc trò chuyện từ {formatTimestamp(conversation.createdAt)}</span>
                                                        <span>Cập nhật lần cuối: {formatTimestamp(conversation.updatedAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ✅ Footer */}
                <div className="border-t p-4 bg-gray-50">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>Đang mở</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span>Đang chờ</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span>Đã đóng</span>
                            </div>
                        </div>
                        <div className="text-gray-500">
                            Nhấp vào cuộc trò chuyện để xem chi tiết
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHistory;