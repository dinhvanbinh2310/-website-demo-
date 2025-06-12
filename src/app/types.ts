// ✅ THÊM MỚI: File riêng cho TypeScript types
export interface PurchaseHistory {
    product: string;
    date: string;
    price: string;
    status: string;
}

export interface Warranty {
    product: string;
    startDate: string;
    endDate: string;
    status: string;
}

// ✅ THÊM MỚI: Interface cho tin nhắn chat
export interface ChatMessage {
    id: number;
    sender: 'customer' | 'staff';
    message: string;
    timestamp: string;
    staffName?: string; // Tên nhân viên (nếu là staff)
    messageType?: 'text' | 'image' | 'file'; // Loại tin nhắn
}
// ✅ THÊM MỚI: Interface cho cuộc trò chuyện
export interface Conversation {
    id: number;
    customerId: number;
    title: string; // Tiêu đề cuộc trò chuyện
    status: 'open' | 'closed' | 'pending'; // Trạng thái
    priority: 'low' | 'medium' | 'high'; // Độ ưu tiên
    category: 'support' | 'sales' | 'complaint' | 'inquiry'; // Loại
    createdAt: string;
    updatedAt: string;
    messages: ChatMessage[];
}

export interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    purchaseHistory: PurchaseHistory[];
    warranty: Warranty[];
    conversations: Conversation[]; // ✅ THÊM MỚI: Danh sách cuộc trò chuyện
}

// ✅ THÊM MỚI: Interface cho conversation history
export interface ConversationEntry {
    id: number;
    timestamp: string;
    searchType: 'phone' | 'email' | 'name';
    searchValue: string;
    resultFound: boolean;
    customerName?: string;
}
// ✅ THÊM MỚI: Interface cho search history (giữ lại cho tính năng tìm kiếm)
export interface SearchEntry {
    id: number;
    timestamp: string;
    searchType: 'phone' | 'email' | 'name';
    searchValue: string;
    resultFound: boolean;
    customerName?: string;
}

// ✅ Union type cho kết quả search
export type SearchResult = Customer | { type: 'not_found' } | null;