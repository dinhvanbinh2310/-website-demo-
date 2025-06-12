// ✅ THÊM MỚI: File riêng cho demo data
import { Customer } from './types';

export const demoCustomers: Customer[] = [
    {
        id: 1,
        name: 'Nguyễn Văn An',
        phone: '0123456789',
        email: 'nguyenvanan@email.com',
        address: '123 Lê Lợi, Q1, TP.HCM',
        purchaseHistory: [
            {
                product: 'Sony WH-1000XM4',
                date: '2024-01-15',
                price: '8,990,000đ',
                status: 'Đã giao'
            },
            {
                product: 'Audio-Technica ATH-M50x',
                date: '2023-12-10',
                price: '3,500,000đ',
                status: 'Đã giao'
            }
        ],
        warranty: [
            {
                product: 'Sony WH-1000XM4',
                startDate: '2024-01-15',
                endDate: '2026-01-15',
                status: 'Còn hạn'
            }
        ],
        // ✅ THÊM MỚI: Lịch sử cuộc trò chuyện
        conversations: [
            {
                id: 1,
                customerId: 1,
                title: 'Hỗ trợ tai nghe Sony bị lỗi',
                status: 'closed',
                priority: 'high',
                category: 'support',
                createdAt: '2024-06-01 09:30:00',
                updatedAt: '2024-06-01 15:45:00',
                messages: [
                    {
                        id: 1,
                        sender: 'customer',
                        message: 'Chào shop! Tai nghe Sony WH-1000XM4 của em bị lỗi không kết nối được bluetooth ạ',
                        timestamp: '2024-06-01 09:30:00'
                    },
                    {
                        id: 2,
                        sender: 'staff',
                        message: 'Chào anh An! Shop đã nhận được thông tin. Anh có thể thử reset tai nghe bằng cách giữ nút power + NC trong 7 giây không ạ?',
                        timestamp: '2024-06-01 09:35:00',
                        staffName: 'Nguyễn Thị Mai'
                    },
                    {
                        id: 3,
                        sender: 'customer',
                        message: 'Em đã thử rồi mà vẫn không được ạ. Có cách nào khác không shop?',
                        timestamp: '2024-06-01 10:15:00'
                    },
                    {
                        id: 4,
                        sender: 'staff',
                        message: 'Vậy anh mang tai nghe đến shop để kiểm tra bảo hành nhé. Địa chỉ: 123 Lê Lợi, Q1. Giờ làm việc: 8h-21h',
                        timestamp: '2024-06-01 10:20:00',
                        staffName: 'Nguyễn Thị Mai'
                    },
                    {
                        id: 5,
                        sender: 'customer',
                        message: 'Ok em sẽ qua chiều nay. Cảm ơn shop!',
                        timestamp: '2024-06-01 14:30:00'
                    },
                    {
                        id: 6,
                        sender: 'staff',
                        message: 'Đã kiểm tra và thay thế tai nghe mới cho anh. Cảm ơn anh đã tin tưởng shop!',
                        timestamp: '2024-06-01 15:45:00',
                        staffName: 'Trần Văn Nam'
                    }
                ]
            },
            {
                id: 2,
                customerId: 1,
                title: 'Tư vấn mua thêm phụ kiện',
                status: 'open',
                priority: 'medium',
                category: 'sales',
                createdAt: '2024-06-10 14:20:00',
                updatedAt: '2024-06-10 14:35:00',
                messages: [
                    {
                        id: 7,
                        sender: 'customer',
                        message: 'Shop ơi, em muốn mua thêm case đựng tai nghe Sony. Shop có không ạ?',
                        timestamp: '2024-06-10 14:20:00'
                    },
                    {
                        id: 8,
                        sender: 'staff',
                        message: 'Có ạ! Shop có case chính hãng Sony và case aftermarket. Anh muốn loại nào? Case chính hãng 850k, aftermarket chất lượng cao 320k',
                        timestamp: '2024-06-10 14:25:00',
                        staffName: 'Lê Thị Hoa'
                    },
                    {
                        id: 9,
                        sender: 'customer',
                        message: 'Em lấy case aftermarket nhé. Khi nào có thể lấy được?',
                        timestamp: '2024-06-10 14:35:00'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Trần Thị Bình',
        phone: '0987654321',
        email: 'tranthibinh@email.com',
        address: '456 Nguyễn Huệ, Q1, TP.HCM',
        purchaseHistory: [
            {
                product: 'Bose QuietComfort 35 II',
                date: '2024-02-20',
                price: '7,500,000đ',
                status: 'Đã giao'
            }
        ],
        warranty: [
            {
                product: 'Bose QuietComfort 35 II',
                startDate: '2024-02-20',
                endDate: '2026-02-20',
                status: 'Còn hạn'
            }
        ],
        conversations: [
            {
                id: 3,
                customerId: 2,
                title: 'Khiếu nại chất lượng sản phẩm',
                status: 'pending',
                priority: 'high',
                category: 'complaint',
                createdAt: '2024-06-08 16:45:00',
                updatedAt: '2024-06-09 10:30:00',
                messages: [
                    {
                        id: 10,
                        sender: 'customer',
                        message: 'Shop ơi, tai nghe Bose em mới mua 3 tháng mà đã bị rạn vỏ ạ. Em có thể đổi trả không?',
                        timestamp: '2024-06-08 16:45:00'
                    },
                    {
                        id: 11,
                        sender: 'staff',
                        message: 'Chào chị Bình! Việc này rất tiếc. Chị có thể gửi hình ảnh sản phẩm để shop kiểm tra không ạ?',
                        timestamp: '2024-06-08 17:00:00',
                        staffName: 'Nguyễn Thị Mai'
                    },
                    {
                        id: 12,
                        sender: 'customer',
                        message: '[Đã gửi hình ảnh] Đây ạ, vết nứt ở phần khớp nối',
                        timestamp: '2024-06-08 17:15:00',
                        messageType: 'image'
                    },
                    {
                        id: 13,
                        sender: 'staff',
                        message: 'Shop đã nhận được hình ảnh. Đây là lỗi sản xuất, shop sẽ đổi sản phẩm mới cho chị. Chị qua shop ngày mai được không ạ?',
                        timestamp: '2024-06-09 10:30:00',
                        staffName: 'Trần Văn Nam'
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Lê Minh Châu',
        phone: '0369852147',
        email: 'leminhchau@email.com',
        address: '789 Võ Văn Tần, Q3, TP.HCM',
        purchaseHistory: [
            {
                product: 'JBL Charge 5',
                date: '2024-03-10',
                price: '2,500,000đ',
                status: 'Đang giao'
            }
        ],
        warranty: [],
        conversations: [
            {
                id: 4,
                customerId: 3,
                title: 'Hỏi về tình trạng đơn hàng',
                status: 'closed',
                priority: 'low',
                category: 'inquiry',
                createdAt: '2024-03-12 11:20:00',
                updatedAt: '2024-03-12 15:10:00',
                messages: [
                    {
                        id: 14,
                        sender: 'customer',
                        message: 'Shop ơi, loa JBL em đặt hôm qua giờ chưa thấy giao. Đơn hàng sao rồi ạ?',
                        timestamp: '2024-03-12 11:20:00'
                    },
                    {
                        id: 15,
                        sender: 'staff',
                        message: 'Chào anh Châu! Shop kiểm tra thấy đơn hàng đang trên đường giao. Dự kiến 17h chiều nay sẽ đến ạ',
                        timestamp: '2024-03-12 11:45:00',
                        staffName: 'Lê Thị Hoa'
                    },
                    {
                        id: 16,
                        sender: 'customer',
                        message: 'Ok em cảm ơn shop',
                        timestamp: '2024-03-12 12:00:00'
                    },
                    {
                        id: 17,
                        sender: 'staff',
                        message: 'Anh đã nhận được hàng chưa ạ? Nếu có vấn đề gì liên hệ shop nhé!',
                        timestamp: '2024-03-12 18:00:00',
                        staffName: 'Lê Thị Hoa'
                    },
                    {
                        id: 18,
                        sender: 'customer',
                        message: 'Em đã nhận rồi. Loa rất đẹp và chất lượng. Cảm ơn shop!',
                        timestamp: '2024-03-12 18:30:00'
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        name: 'Phạm Văn Đức',
        phone: '0555123456',
        email: 'phamvanduc@email.com',
        address: '321 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',
        purchaseHistory: [
            {
                product: 'Marshall Acton II',
                date: '2024-05-08',
                price: '4,200,000đ',
                status: 'Đã giao'
            },
            {
                product: 'AirPods Pro 2',
                date: '2024-04-15',
                price: '6,500,000đ',
                status: 'Đã giao'
            }
        ],
        warranty: [
            {
                product: 'Marshall Acton II',
                startDate: '2024-05-08',
                endDate: '2026-05-08',
                status: 'Còn hạn'
            },
            {
                product: 'AirPods Pro 2',
                startDate: '2024-04-15',
                endDate: '2025-04-15',
                status: 'Còn hạn'
            }
        ],
        conversations: [
            {
                id: 5,
                customerId: 4,
                title: 'Tư vấn so sánh sản phẩm',
                status: 'closed',
                priority: 'medium',
                category: 'sales',
                createdAt: '2024-04-10 13:15:00',
                updatedAt: '2024-04-12 16:20:00',
                messages: [
                    {
                        id: 19,
                        sender: 'customer',
                        message: 'Shop ơi, em muốn hỏi so sánh giữa AirPods Pro 2 và Sony WF-1000XM4. Cái nào tốt hơn ạ?',
                        timestamp: '2024-04-10 13:15:00'
                    },
                    {
                        id: 20,
                        sender: 'staff',
                        message: 'Chào anh Đức! Cả 2 đều là tai nghe cao cấp. AirPods Pro 2 tích hợp tốt với iPhone, còn Sony có chống ồn mạnh hơn. Anh dùng điện thoại gì ạ?',
                        timestamp: '2024-04-10 13:30:00',
                        staffName: 'Nguyễn Thị Mai'
                    },
                    {
                        id: 21,
                        sender: 'customer',
                        message: 'Em dùng iPhone 15 Pro ạ. Vậy nên chọn AirPods nhỉ?',
                        timestamp: '2024-04-10 14:00:00'
                    },
                    {
                        id: 22,
                        sender: 'staff',
                        message: 'Đúng rồi ạ! Với iPhone thì AirPods Pro 2 sẽ tối ưu nhất. Có tính năng Spatial Audio và kết nối rất mượt',
                        timestamp: '2024-04-10 14:15:00',
                        staffName: 'Nguyễn Thị Mai'
                    },
                    {
                        id: 23,
                        sender: 'customer',
                        message: 'Ok em đặt AirPods Pro 2 nhé. Bao giờ có hàng?',
                        timestamp: '2024-04-12 10:30:00'
                    },
                    {
                        id: 24,
                        sender: 'staff',
                        message: 'Shop có sẵn ạ! Anh có thể qua lấy ngay hoặc ship về',
                        timestamp: '2024-04-12 10:45:00',
                        staffName: 'Trần Văn Nam'
                    }
                ]
            }
        ]
    }
];