// ✅ THÊM MỚI: File utility functions
import { Customer, SearchEntry } from './types';

/**
 * ✅ Function để get status color cho UI
 */
export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'Đã giao':
            return 'text-green-600 bg-green-100';
        case 'Đang giao':
            return 'text-yellow-600 bg-yellow-100';
        case 'Còn hạn':
            return 'text-blue-600 bg-blue-100';
        case 'Hết hạn':
            return 'text-red-600 bg-red-100';
        default:
            return 'text-gray-600 bg-gray-100';
    }
};

/**
 * ✅ Function tìm kiếm customer
 */
export const searchCustomer = (
    customers: Customer[],
    searchType: 'phone' | 'email' | 'name',
    searchValue: string
): Customer | undefined => {
    return customers.find(customer => {
        const value = searchValue.toLowerCase().trim();

        switch (searchType) {
            case 'phone':
                return customer.phone.includes(value);
            case 'email':
                return customer.email.toLowerCase().includes(value);
            case 'name':
                return customer.name.toLowerCase().includes(value);
            default:
                return false;
        }
    });
};

/**
 * ✅ Function tạo conversation entry mới
 */
export const createConversationEntry = (
    searchType: 'phone' | 'email' | 'name',
    searchValue: string,
    result: Customer | undefined
): SearchEntry => {
    return {
        id: Date.now(),
        timestamp: new Date().toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }),
        searchType,
        searchValue,
        resultFound: !!result,
        customerName: result?.name
    };
};

/**
 * ✅ Function format currency (Vietnamese)
 */
export const formatCurrency = (amount: string): string => {
    // Nếu đã có đơn vị đ thì return luôn
    if (amount.includes('đ')) return amount;

    // Parse number và format lại
    const number = parseInt(amount.replace(/\D/g, ''));
    return new Intl.NumberFormat('vi-VN').format(number) + 'đ';
};

/**
 * ✅ Function format date (Vietnamese)
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

/**
 * ✅ Function validate search input
 */
export const validateSearchInput = (
    searchType: 'phone' | 'email' | 'name',
    searchValue: string
): { isValid: boolean; message?: string } => {
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
        return { isValid: false, message: 'Vui lòng nhập từ khóa tìm kiếm' };
    }

    switch (searchType) {
        case 'phone':
            if (!/^[0-9+\-\s()]+$/.test(trimmedValue)) {
                return { isValid: false, message: 'Số điện thoại chỉ được chứa số và ký tự +, -, (, ), space' };
            }
            break;
        case 'email':
            if (trimmedValue.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
                return { isValid: false, message: 'Email không đúng định dạng' };
            }
            break;
        case 'name':
            if (trimmedValue.length < 2) {
                return { isValid: false, message: 'Tên phải có ít nhất 2 ký tự' };
            }
            break;
    }

    return { isValid: true };
};