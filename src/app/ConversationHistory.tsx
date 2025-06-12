'use client';

import React from 'react';
import { MessageCircle, X, Phone, Mail, User } from 'lucide-react';
import { SearchEntry } from './types';

// ✅ THÊM MỚI: Props interface cho ConversationHistory component
interface ConversationHistoryProps {
    showHistory: boolean;
    conversationHistory: SearchEntry[];
    onClose: () => void;
    onClearHistory: () => void;
    onSearchFromHistory: (entry: SearchEntry) => void;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({
    showHistory,
    conversationHistory,
    onClose,
    onClearHistory,
    onSearchFromHistory
}) => {
    // ✅ Không render nếu modal đóng
    if (!showHistory) return null;

    return (
        <div className="fixed inset-0 bg-neutral-200/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                {/* ✅ Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Lịch sử cuộc trò chuyện
                    </h3>
                    <div className="flex items-center gap-2">
                        {conversationHistory.length > 0 && (
                            <button
                                onClick={onClearHistory}
                                className="px-3 py-1 text-sm bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition-colors"
                            >
                                Xóa tất cả
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* ✅ Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {conversationHistory.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>Chưa có lịch sử tìm kiếm nào</p>
                            <p className="text-sm mt-2">Thực hiện tìm kiếm để xem lịch sử tại đây</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {conversationHistory.map((entry) => (
                                <div
                                    key={entry.id}
                                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                    onClick={() => onSearchFromHistory(entry)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {/* ✅ Search type với icon */}
                                            <div className="flex items-center gap-2 mb-2">
                                                {entry.searchType === 'phone' && <Phone className="w-4 h-4 text-gray-500" />}
                                                {entry.searchType === 'email' && <Mail className="w-4 h-4 text-gray-500" />}
                                                {entry.searchType === 'name' && <User className="w-4 h-4 text-gray-500" />}
                                                <span className="font-medium text-sm text-gray-600">
                                                    {entry.searchType === 'phone' && 'Tìm theo SĐT'}
                                                    {entry.searchType === 'email' && 'Tìm theo Email'}
                                                    {entry.searchType === 'name' && 'Tìm theo Tên'}
                                                </span>
                                                <span className="text-xs text-gray-400">{entry.timestamp}</span>
                                            </div>

                                            {/* ✅ Search value */}
                                            <p className="text-gray-800 mb-1">
                                                <strong>Từ khóa:</strong> <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{entry.searchValue}</span>
                                            </p>

                                            {/* ✅ Result status */}
                                            {entry.resultFound ? (
                                                <p className="text-green-600 text-sm flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                    Tìm thấy: <strong>{entry.customerName}</strong>
                                                </p>
                                            ) : (
                                                <p className="text-red-600 text-sm flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                    Không tìm thấy kết quả
                                                </p>
                                            )}
                                        </div>

                                        {/* ✅ Click indicator */}
                                        <div className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                            <span>Tìm lại</span>
                                            <span>→</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationHistory;