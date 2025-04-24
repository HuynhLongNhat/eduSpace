import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Calendar,
  Download,
  User,
  Activity,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  MessageSquare,
  Video,
  BookOpen,
  FileText,
} from "lucide-react";
import { format, parseISO, subDays } from "date-fns";
import { getAllAuditLog } from "@/api/AuditLogApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const getStatusIcon = (action) => {
  switch (action) {
    case "view_page":
      return <Eye className="h-4 w-4 mr-1" />;
    case "login":
      return <User className="h-4 w-4 mr-1" />;
    case "logout":
      return <User className="h-4 w-4 mr-1" />;
    case "create":
      return <CheckCircle className="h-4 w-4 mr-1" />;
    case "update":
      return <RefreshCw className="h-4 w-4 mr-1" />;
    case "delete":
      return <XCircle className="h-4 w-4 mr-1" />;
    case "export":
      return <Download className="h-4 w-4 mr-1" />;
    case "import":
      return <Download className="h-4 w-4 mr-1" />;
    case "submit_assignment":
      return <FileText className="h-4 w-4 mr-1" />;
    case "take_exam":
      return <BookOpen className="h-4 w-4 mr-1" />;
    case "join_meeting":
      return <Video className="h-4 w-4 mr-1" />;
    case "leave_meeting":
      return <Video className="h-4 w-4 mr-1" />;
    case "comment":
      return <MessageSquare className="h-4 w-4 mr-1" />;
    default:
      return <Activity className="h-4 w-4 mr-1" />;
  }
};

const getActionMessage = (action) => {
  switch (action) {
    case "view_page":
      return "Xem trang";
    case "login":
      return "Đăng nhập vào hệ thống";
    case "logout":
      return "Đăng xuất khỏi hệ thống";
    case "create":
      return "Tạo mới bản ghi";
    case "update":
      return "Cập nhật thông tin";
    case "delete":
      return "Xóa bản ghi";
    case "export":
      return "Xuất dữ liệu";
    case "import":
      return "Nhập dữ liệu";
    case "submit_assignment":
      return "Nộp bài tập";
    case "take_exam":
      return "Làm bài kiểm tra";
    case "join_meeting":
      return "Tham gia cuộc họp";
    case "leave_meeting":
      return "Rời khỏi cuộc họp";
    case "comment":
      return "Bình luận";
    default:
      return "Hoạt động khác";
  }
};

const dateRangePresets = [
  { label: "Hôm nay", days: 0 },
  { label: "Hôm qua", days: 1 },
  { label: "7 ngày qua", days: 7 },
  { label: "30 ngày qua", days: 30 },
  { label: "Tháng này", days: "this-month" },
  { label: "Tháng trước", days: "last-month" },
];

const ListAuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchAllAuditLogs();
  }, []);

  const fetchAllAuditLogs = async () => {
    try {
      setLoading(true);
      const res = await getAllAuditLog();
      if (res.success) {
        const reversedData = res.data.slice().reverse();
        setLogs(reversedData);
        setFilteredLogs(reversedData);
      }
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = logs;

    if (searchTerm) {
      result = result.filter(
        (log) =>
          (log.fullname &&
            log.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (log.username &&
            log.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (log.ip_address && log.ip_address.includes(searchTerm)) ||
          (log.page_url &&
            log.page_url.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (log.details &&
            log.details.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (actionFilter && actionFilter !== "all") {
      result = result.filter((log) => log.action === actionFilter);
    }

    if (dateRange && dateRange.from && dateRange.to) {
      // Set time to beginning and end of day
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);

      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);

      result = result.filter((log) => {
        const logDate = parseISO(log.start_time);
        return logDate >= fromDate && logDate <= toDate;
      });
    }

    setFilteredLogs(result);
    setCurrentPage(1);
  };

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, actionFilter, dateRange, logs]);

  const pageCount = Math.ceil(filteredLogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
  };

  const handleCloseDetails = () => {
    setSelectedLog(null);
  };

  const getUniqueActions = () => {
    const actions = [...new Set(logs.map((log) => log.action))];
    return actions;
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleDatePresetChange = (days) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (days === "this-month") {
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      setDateRange({ from, to: today });
    } else if (days === "last-month") {
      const from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const to = new Date(today.getFullYear(), today.getMonth(), 0);
      to.setHours(23, 59, 59, 999);
      setDateRange({ from, to });
    } else {
      const from = subDays(today, days);
      from.setHours(0, 0, 0, 0);
      setDateRange({ from, to: today });
    }
  };

  const resetDateFilter = () => {
    setDateRange(null);
  };

  const exportToCSV = () => {
    setIsExporting(true);

    try {
      // Build CSV headers
      const headers = [
        "ID",
        "Thời gian",
        "Người dùng",
        "Email",
        "Hành động",
        "IP",
        "URL",
        "Chi tiết",
        "Đối tượng tác động",
        "Thời gian kết thúc",
        "User Agent",
      ].join(",");

      // Build CSV rows
      const rows = filteredLogs
        .map((log) => {
          // Wrap fields that might contain commas in quotes
          const formattedTime = format(
            parseISO(log.start_time),
            "dd/MM/yyyy HH:mm:ss"
          );
          const formattedEndTime = log.end_time
            ? format(parseISO(log.end_time), "dd/MM/yyyy HH:mm:ss")
            : "";
          const actionText = getActionMessage(log.action);

          return [
            log.id,
            formattedTime,
            `"${log.fullname || ""}"`,
            `"${log.username || ""}"`,
            `"${actionText}"`,
            log.ip_address || "",
            `"${log.page_url || ""}"`,
            `"${log.details || ""}"`,
            `"${
              log.target_type
                ? log.target_type + " (ID: " + log.target_id + ")"
                : ""
            }"`,
            formattedEndTime,
            `"${log.user_agent || ""}"`,
          ].join(",");
        })
        .join("\n");

      // Create full CSV content
      const csvContent = `${headers}\n${rows}`;

      // Create CSV file and trigger download
      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `audit-log-export-${format(new Date(), "yyyyMMdd-HHmmss")}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const renderDateRangeInfo = () => {
    if (!dateRange || !dateRange.from) return "Chọn khoảng thời gian";

    if (dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
        dateRange.to,
        "dd/MM/yyyy"
      )}`;
    }

    return format(dateRange.from, "dd/MM/yyyy");
  };

  const renderPagination = () => {
    if (pageCount <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    if (pageCount <= maxVisiblePages) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= pageCount - 2) {
        for (let i = pageCount - 4; i <= pageCount; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {!pages.includes(1) && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {!pages.includes(pageCount) && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(pageCount)}>
                  {pageCount}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(Math.min(pageCount, currentPage + 1))
              }
              className={
                currentPage === pageCount
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-gray-500 mt-1">
          Theo dõi tất cả hoạt động của người dùng trong hệ thống
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Nhật ký hoạt động</CardTitle>
              <CardDescription>
                Tổng cộng {filteredLogs.length} bản ghi
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {renderDateRangeInfo()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="p-3 border-b">
                    <div className="grid grid-cols-2 gap-2">
                      {dateRangePresets.map((preset) => (
                        <Button
                          key={preset.label}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleDatePresetChange(preset.days)}
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 w-full text-xs"
                      onClick={resetDateFilter}
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>

                  <div className="p-3">
                    <div className="flex flex-col gap-2">
                      <div>
                        <div className="text-sm font-medium mb-1">Từ ngày</div>
                        <Input
                          type="date"
                          value={
                            dateRange?.from
                              ? format(dateRange.from, "yyyy-MM-dd")
                              : ""
                          }
                          onChange={(e) => {
                            const newDate = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            setDateRange((prev) => ({
                              ...prev,
                              from: newDate,
                            }));
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Đến ngày</div>
                        <Input
                          type="date"
                          value={
                            dateRange?.to
                              ? format(dateRange.to, "yyyy-MM-dd")
                              : ""
                          }
                          onChange={(e) => {
                            const newDate = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            setDateRange((prev) => ({
                              ...prev,
                              to: newDate,
                            }));
                          }}
                          className="w-full"
                          min={
                            dateRange?.from
                              ? format(dateRange.from, "yyyy-MM-dd")
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={exportToCSV}
                disabled={isExporting || filteredLogs.length === 0}
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
                    Đang xuất...
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Xuất CSV
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên, email, IP, nội dung..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-1" />
                    <SelectValue placeholder="Hành động" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tất cả hành động</SelectItem>
                    <SelectItem value="login">Đăng nhập</SelectItem>
                    <SelectItem value="logout">Đăng xuất</SelectItem>
                    <SelectItem value="view_page">Xem trang</SelectItem>
                    <SelectItem value="create">Tạo mới</SelectItem>
                    <SelectItem value="update">Cập nhật</SelectItem>
                    <SelectItem value="delete">Xóa</SelectItem>
                    <SelectItem value="export">Xuất dữ liệu</SelectItem>
                    <SelectItem value="import">Nhập dữ liệu</SelectItem>
                    <SelectItem value="submit_assignment">
                      Nộp bài tập
                    </SelectItem>
                    <SelectItem value="take_exam">Làm bài kiểm tra</SelectItem>
                    <SelectItem value="join_meeting">
                      Tham gia cuộc họp
                    </SelectItem>
                    <SelectItem value="leave_meeting">
                      Rời khỏi cuộc họp
                    </SelectItem>
                    <SelectItem value="comment">Bình luận</SelectItem>
                    {getUniqueActions()
                      .filter(
                        (action) =>
                          ![
                            "login",
                            "logout",
                            "view_page",
                            "create",
                            "update",
                            "delete",
                            "export",
                            "import",
                            "submit_assignment",
                            "take_exam",
                            "join_meeting",
                            "leave_meeting",
                            "comment",
                          ].includes(action)
                      )
                      .map((action) => (
                        <SelectItem key={action} value={action}>
                          {getActionMessage(action)}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                <p className="mt-4 text-gray-500">Đang tải dữ liệu...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Thời gian</TableHead>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Hành động</TableHead>
                      <TableHead className="hidden md:table-cell">IP</TableHead>
                      <TableHead className="hidden md:table-cell">
                        URL
                      </TableHead>
                      <TableHead className="text-right">Chi tiết</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-10 text-gray-500"
                        >
                          Không tìm thấy bản ghi nào phù hợp
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentItems.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs text-gray-500">
                            <div className="flex flex-col">
                              <span>
                                {format(parseISO(log.start_time), "dd/MM/yyyy")}
                              </span>
                              <span>
                                {format(parseISO(log.start_time), "HH:mm:ss")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {log.fullname || "N/A"}
                              </span>
                              <span className="text-xs text-gray-500">
                                {log.username || "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getStatusIcon(log.action)}
                              <span>{getActionMessage(log.action)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-mono text-xs">
                            {log.ip_address || "N/A"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-xs truncate max-w-[200px]">
                            <span title={log.page_url}>
                              {log.page_url || "N/A"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(log)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Hiển thị {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, filteredLogs.length)} trong tổng số{" "}
                  {filteredLogs.length} bản ghi
                </div>
                {renderPagination()}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Chi tiết nhật ký</CardTitle>
                  <CardDescription>ID: {selectedLog.id}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseDetails}
                  className="h-8 w-8 p-0"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Thời gian bắt đầu
                    </h3>
                    <p className="mt-1">
                      {format(
                        parseISO(selectedLog.start_time),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Thời gian kết thúc
                    </h3>
                    <p className="mt-1">
                      {selectedLog.end_time
                        ? format(
                            parseISO(selectedLog.end_time),
                            "dd/MM/yyyy HH:mm:ss"
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Người dùng
                  </h3>
                  <div className="mt-1 space-y-1">
                    <p className="font-medium">
                      {selectedLog.fullname || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedLog.username || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      User ID: {selectedLog.user_id || "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Hành động
                  </h3>
                  <div className="mt-1 flex items-center">
                    {getStatusIcon(selectedLog.action)}
                    <span>{getActionMessage(selectedLog.action)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    URL trang
                  </h3>
                  <p className="mt-1 break-all">
                    {selectedLog.page_url || "N/A"}
                  </p>
                </div>

                {selectedLog.target_id && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Đối tượng tác động
                    </h3>
                    <div className="mt-1">
                      <p>Loại: {selectedLog.target_type || "N/A"}</p>
                      <p>ID: {selectedLog.target_id || "N/A"}</p>
                    </div>
                  </div>
                )}

                {selectedLog.details && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Chi tiết
                    </h3>
                    <p className="mt-1 break-all">{selectedLog.details}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Địa chỉ IP
                    </h3>
                    <p className="mt-1 font-mono">
                      {selectedLog.ip_address || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      User Agent
                    </h3>
                    <p
                      className="mt-1 text-sm break-words"
                      title={selectedLog.user_agent}
                    >
                      {selectedLog.user_agent || "N/A"}
                    </p>
                  </div>
                </div>

                {selectedLog.duration_seconds && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Thời gian thực hiện
                    </h3>
                    <p className="mt-1">{selectedLog.duration_seconds} giây</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ListAuditLog;
