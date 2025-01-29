import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Calendar as CalendarIcon,
  ArrowLeft,
  Clock,
  FileText,
  Users,
  Book,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
export const DateTimePicker = ({ field }) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleTimeChange = (type, value) => {
    const currentDate = field.value || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      newDate.setHours(parseInt(value), newDate.getMinutes(), 0);
    } else {
      newDate.setMinutes(parseInt(value));
    }

    field.onChange(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50 ${
              !field.value && "text-gray-500"
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            {field.value
              ? format(field.value, "EEEE, dd MMMM yyyy 'lúc' HH:mm", {
                  locale: vi,
                })
              : "Chọn thời gian nộp bài"}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex items-center gap-2 mb-3">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-gray-700">Chọn ngày</span>
            </div>
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(date) => {
                if (!date) return;
                const newDate = new Date(date);
                const oldDate = field.value || new Date();
                newDate.setHours(oldDate.getHours(), oldDate.getMinutes(), 0);
                field.onChange(newDate);
              }}
              className="rounded-md border shadow-sm"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-gray-700">Chọn giờ</span>
            </div>
            <div className="flex gap-2 items-center">
              <select
                value={field.value ? format(field.value, "HH") : "00"}
                onChange={(e) => handleTimeChange("hour", e.target.value)}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} giờ
                  </option>
                ))}
              </select>
              <span className="text-xl font-medium text-gray-400">:</span>
              <select
                value={field.value ? format(field.value, "mm") : "00"}
                onChange={(e) => handleTimeChange("minute", e.target.value)}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute} phút
                  </option>
                ))}
              </select>
            </div>
          </div>

          {field.value && (
            <div className="pt-4 border-t">
              <div className="text-sm text-gray-500">Đã chọn:</div>
              <div className="font-medium text-blue-600">
                {format(field.value, "EEEE, dd MMMM yyyy 'lúc' HH:mm", {
                  locale: vi,
                })}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
