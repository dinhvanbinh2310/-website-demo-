'use client';

import React, { useState } from 'react';
import { Search, Phone, Mail, User, Headphones, Speaker, Mic, Clock, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
// ✅ IMPORT: Từ các files đã tách
import {
  Customer,
  SearchResult,
  SearchEntry,
  PurchaseHistory,
  Warranty,
  Conversation
} from './types';
import { demoCustomers } from './demoData';
import {
  getStatusColor,
  searchCustomer,
  createConversationEntry,
  validateSearchInput
} from './utils';
import ConversationHistory from './ConversationHistory';
import ChatHistory from './ChatHistory'; // ✅ THÊM MỚI: Import ChatHistory
import './globals.css'; // ✅ THÊM MỚI: Import CSS toàn cục

const AudioCustomerLookup: React.FC = () => {
  // ✅ STATE MANAGEMENT
  const [searchType, setSearchType] = useState<'phone' | 'email' | 'name'>('phone');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<SearchEntry[]>([]); // ✅ SỬA ĐỔI: Đổi tên
  const [showSearchHistory, setShowSearchHistory] = useState<boolean>(false);
  // ✅ THÊM MỚI: State cho chat history
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [chatConversations, setChatConversations] = useState<Conversation[]>([]);
  const [showChatHistory, setShowChatHistory] = useState(false);

  // ✅ SEARCH FUNCTION - Sử dụng utils
  const handleSearch = async (): Promise<void> => {
    // Validate input
    const validation = validateSearchInput(searchType, searchValue);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      const result = searchCustomer(demoCustomers, searchType, searchValue);
      // ✅ SỬA ĐỔI: Thêm type assertion để TypeScript hiểu đúng kiểu
      const searchResultValue: SearchResult = result ? result : ({ type: 'not_found' } as const);
      setSearchResult(searchResultValue);

      // ⭐️ Xử lý search success: gán selectedCustomerId
      if (result) {
        handleSearchSuccess(result);
      } else {
        setSelectedCustomerId(null);
      }

      // Lưu vào conversation history
      const newEntry = createConversationEntry(searchType, searchValue, result);
      setSearchHistory(prev => [newEntry, ...prev]);

      setIsSearching(false);
    }, 1000);
  };
  // Khi search thành công, lưu ID của customer
  const handleSearchSuccess = (customer: Customer) => {
    // ... xử lý searchResult
    setSelectedCustomerId(customer.id);
  };
  // Mỗi khi selectedCustomerId thay đổi, load conversations
  useEffect(() => {
    if (selectedCustomerId === null) {
      setChatConversations([]);
      return;
    }
    const cust = demoCustomers.find(c => c.id === selectedCustomerId);
    setChatConversations(cust?.conversations || []);
  }, [selectedCustomerId]);

  // Mở modal chat
  const showCustomerChatHistory = () => {
    if (selectedCustomerId !== null) {
      setShowChatHistory(true);
    }
  };
  // ✅ HISTORY FUNCTIONS - Search History
  const clearSearchHistory = (): void => {
    setSearchHistory([]);
    setShowSearchHistory(false);
  };

  const searchFromHistory = (entry: SearchEntry): void => {
    setSearchType(entry.searchType);
    setSearchValue(entry.searchValue);
    setShowSearchHistory(false);
    // Tự động search
    setTimeout(() => handleSearch(), 100);
  };


  const resetSearch = (): void => {
    setSearchValue('');
    setSearchResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ✅ HEADER */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Headphones className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">AudioPro Store</h1>
          </div>
          <p className="text-gray-600">Hệ thống tra cứu thông tin khách hàng</p>

          {/* History button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowSearchHistory(!showSearchHistory)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Clock className="w-4 h-4" />
              Lịch sử tìm kiếm ({searchHistory.length})
            </button>
          </div>
        </div>

        {/* ✅ CONVERSATION HISTORY - Component từ file riêng */}
        <ConversationHistory
          showHistory={showSearchHistory}
          conversationHistory={searchHistory}
          onClose={() => setShowSearchHistory(false)}
          onClearHistory={clearSearchHistory}
          onSearchFromHistory={searchFromHistory}
        />
        {/* CHAT HISTORY */}
        <ChatHistory
          showChatHistory={showChatHistory}
          customerName={
            demoCustomers.find(c => c.id === selectedCustomerId)?.name || ''
          }
          conversations={chatConversations}
          onClose={() => setShowChatHistory(false)}
        />


        {/* ✅ SEARCH FORM */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Tra cứu thông tin khách hàng
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại tra cứu
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'phone' | 'email' | 'name')}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="phone">Số điện thoại</option>
                <option value="email">Email</option>
                <option value="name">Tên khách hàng</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {searchType === 'phone' && 'Nhập số điện thoại'}
                {searchType === 'email' && 'Nhập email'}
                {searchType === 'name' && 'Nhập tên khách hàng'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchType === 'phone' ? 'VD: 0123456789' :
                      searchType === 'email' ? 'VD: customer@email.com' :
                        'VD: Nguyễn Văn An'
                  }
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={!searchValue.trim() || isSearching}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSearching ? 'Đang tìm...' : 'Tìm kiếm'}
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Demo Data Info */}
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-800 font-medium mb-2">📝 Dữ liệu demo có sẵn:</p>
            <div className="text-sm text-blue-700 grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>📞 <strong>SĐT:</strong> 0123456789, 0987654321, 0555123456</div>
              <div>📧 <strong>Email:</strong> nguyenvanan@email.com, tranthibinh@email.com</div>
              <div>👤 <strong>Tên:</strong> Nguyễn Văn An, Trần Thị Bình, Lê Minh Châu</div>
            </div>
          </div>
        </div>

        {/* ✅ SEARCH RESULTS */}
        {searchResult && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Not Found Case */}
            {searchResult && 'type' in searchResult && searchResult.type === 'not_found' ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <User className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Không tìm thấy khách hàng
                </h3>
                <p className="text-gray-600 mb-4">
                  Không có thông tin khách hàng với {searchType === 'phone' ? 'số điện thoại' : searchType === 'email' ? 'email' : 'tên'}:
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-1">{searchValue}</span>
                </p>
                <button
                  onClick={resetSearch}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Tìm kiếm lại
                </button>
              </div>
            ) : (
              /* Customer Found Case */
              <div>
                {/* Customer Info Header */}
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Thông tin khách hàng
                  </h3>
                  <div className="flex gap-2">
                    {/* ✅ THÊM MỚI: Nút xem lịch sử chat */}
                    <button
                      onClick={showCustomerChatHistory}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Lịch sử trò chuyện
                    </button>
                    <button
                      onClick={resetSearch}
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      Tìm kiếm mới
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {searchResult && 'name' in searchResult && (
                    <>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-gray-500" />
                          <span className="font-medium">Tên:</span>
                          <span>{searchResult.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <span className="font-medium">SĐT:</span>
                          <span>{searchResult.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <span className="font-medium">Email:</span>
                          <span>{searchResult.email}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium">Địa chỉ:</span>
                          <span>{searchResult.address}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Purchase History */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Speaker className="w-5 h-5" />
                    Lịch sử mua hàng
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 p-3 text-left">Sản phẩm</th>
                          <th className="border border-gray-200 p-3 text-left">Ngày mua</th>
                          <th className="border border-gray-200 p-3 text-left">Giá</th>
                          <th className="border border-gray-200 p-3 text-left">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult && 'purchaseHistory' in searchResult && searchResult.purchaseHistory.map((purchase: PurchaseHistory, index: number) => (
                          <tr key={index}>
                            <td className="border border-gray-200 p-3">{purchase.product}</td>
                            <td className="border border-gray-200 p-3">{purchase.date}</td>
                            <td className="border border-gray-200 p-3 font-medium">{purchase.price}</td>
                            <td className="border border-gray-200 p-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                                {purchase.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Warranty Info */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    Thông tin bảo hành
                  </h4>
                  {searchResult && 'warranty' in searchResult && searchResult.warranty.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 p-3 text-left">Sản phẩm</th>
                            <th className="border border-gray-200 p-3 text-left">Ngày bắt đầu</th>
                            <th className="border border-gray-200 p-3 text-left">Ngày kết thúc</th>
                            <th className="border border-gray-200 p-3 text-left">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResult && 'warranty' in searchResult && searchResult.warranty.map((warranty: Warranty, index: number) => (
                            <tr key={index}>
                              <td className="border border-gray-200 p-3">{warranty.product}</td>
                              <td className="border border-gray-200 p-3">{warranty.startDate}</td>
                              <td className="border border-gray-200 p-3">{warranty.endDate}</td>
                              <td className="border border-gray-200 p-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(warranty.status)}`}>
                                  {warranty.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-md">
                      <p className="text-gray-500">Không có thông tin bảo hành</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioCustomerLookup;