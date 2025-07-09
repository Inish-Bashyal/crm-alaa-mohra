"use client";

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type SaleEntry = {
  name: string;
  email: string;
  amount: string;
  category: string;
  date: string;
  description: string;
  paymentMethod: string;
  receiptLink: string;
};

type ModalDialogProps = {
  setOpenModal: (open: boolean) => void;
  onSubmit: (data: SaleEntry, index: number | null) => void;
  editingIndex: number | null;
  initialData: SaleEntry | null;
};

const ModalDialog: React.FC<ModalDialogProps> = ({
  setOpenModal,
  onSubmit,
  editingIndex,
  initialData,
}) => {
  const [formData, setFormData] = useState<SaleEntry>(
    initialData || {
      name: "",
      email: "",
      amount: "",
      category: "",
      date: "",
      description: "",
      paymentMethod: "",
      receiptLink: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, editingIndex);
    setOpenModal(false);
  };

  return (
    <div className=" inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {editingIndex !== null
            ? "Edit Expense Entry"
            : "Create Expense Entry"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { name: "name", type: "text", placeholder: "Name" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "date", type: "date" },
            { name: "description", type: "text", placeholder: "Description" },
            { name: "amount", type: "number", placeholder: "Amount" },
            { name: "receiptLink", type: "text", placeholder: "Receipt Link" },
          ].map(({ name, type, placeholder }) => (
            <input
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={(formData as any)[name]}
              onChange={handleChange}
              required={name !== "description" && name !== "receiptLink"}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ))}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {["Electronics", "Furniture", "Books", "Clothing", "Groceries"].map(
              (cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )
            )}
          </select>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Payment Method</option>
            {["Credit Card", "Debit Card", "PayPal", "Cash"].map((pm) => (
              <option key={pm} value={pm}>
                {pm}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingIndex !== null ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<SaleEntry | null>(null);

  const [recentSales, setRecentSales] = useState<SaleEntry[]>([
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "50001",
      category: "Electronics",
      date: "2023-10-01",
      description: "Laptop Purchase",
      paymentMethod: "Credit Card",
      receiptLink: "https://example.com/receipt1",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "50002",
      category: "Furniture",
      date: "2023-10-02",
      description: "Office Chair",
      paymentMethod: "PayPal",
      receiptLink: "https://example.com/receipt2",
    },
  ]);

  const handleSubmit = (data: SaleEntry, index: number | null) => {
    if (index !== null) {
      const updated = [...recentSales];
      updated[index] = data;
      setRecentSales(updated);
    } else {
      setRecentSales([data, ...recentSales]);
    }
    setEditingIndex(null);
    setInitialData(null);
  };

  const handleEdit = (index: number) => {
    setInitialData(recentSales[index]);
    setEditingIndex(index);
    setOpenModal(true);
  };

  const handleDelete = (index: number) => {
    const updated = [...recentSales];
    updated.splice(index, 1);
    setRecentSales(updated);
  };

  const categoryTotals = recentSales.reduce(
    (acc: Record<string, number>, sale) => {
      const amount = parseFloat(sale.amount);
      if (!acc[sale.category]) acc[sale.category] = 0;
      acc[sale.category] += isNaN(amount) ? 0 : amount;
      return acc;
    },
    {}
  );

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Total Amount",
        data: Object.values(categoryTotals),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  return (
    <>
      {openModal && (
        <ModalDialog
          setOpenModal={setOpenModal}
          onSubmit={handleSubmit}
          editingIndex={editingIndex}
          initialData={initialData}
        />
      )}

      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            CRM for ALAA MOHRA Properties
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              setEditingIndex(null);
              setInitialData(null);
              setOpenModal(true);
            }}
          >
            Create Expense Entry
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Receipt</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale, index) => (
                    <TableRow key={index}>
                      <TableCell>{sale.name}</TableCell>
                      <TableCell>{sale.email}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>{sale.category}</TableCell>
                      <TableCell>{sale.description}</TableCell>
                      <TableCell className="text-right">
                        {sale.amount}
                      </TableCell>
                      <TableCell>{sale.paymentMethod}</TableCell>
                      <TableCell>
                        <a
                          href={sale.receiptLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Link
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Chart (by Category)</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[300px] sm:min-w-full">
              <Bar data={chartData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
