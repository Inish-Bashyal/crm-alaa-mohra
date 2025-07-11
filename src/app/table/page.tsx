"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

type Task = {
  id: string;
  title: string;
  description: string;
};

export default function AllTable() {
  const stats = [
    {
      id: "1",
      title: "Table 1",

      is_occupied: false,
    },
    {
      id: "2",
      is_occupied: true,
      title: "Table 2",
    },
    {
      id: "3",
      is_occupied: false,
      title: "Table 3",
    },
    {
      id: "4",
      is_occupied: false,
      title: "Table 4",
    },
    {
      id: "5",
      is_occupied: true,
      title: "Table 5",
    },
    {
      id: "6",
      is_occupied: true,
      title: "Table 6",
    },
    {
      id: "7",
      is_occupied: true,
      title: "Table 7",
    },
    {
      id: "8",
      is_occupied: false,
      title: "Table 8",
    },
  ];
}
  const [isAdding] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [newTask, setNewTask] = React.useState<Task>({
    id: "",
    title: "",
    description: "",
  });

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">All Tables</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingTask(null);
              setNewTask({ id: "", title: "", description: "" });
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="mb-6">
              <Plus className="mr-2 h-4 w-4" /> Add New Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTask ? "Edit Table" : "Add New Table"}
              </DialogTitle>
              <DialogDescription>
                {editingTask
                  ? "Edit the details of your Table."
                  : "Create a New Table"}
              </DialogDescription>
            </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
            <DialogFooter>
              <Button disabled={isAdding}>
                {isAdding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editingTask ? "Updating..." : "Adding..."}
                  </>
                ) : editingTask ? (
                  "Update Task"
                ) : (
                  "Add Task"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">{stat.title}</CardTitle>
              <div
                className={`w-4 h-4 rounded-full ${
                  stat.is_occupied ? "bg-green-500" : "bg-yellow-500"
                }`}
                title={stat.is_occupied ? "Occupied" : "Not Occupied"}
              ></div>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              {!!stat.is_occupied && (
                // <span
                //     className="text-sm font-medium underline"
                // >
                <Link
                  href={`/table/${stat?.id}`}
                  className="text-sm font-medium underline"
                >
                  View Orders
                </Link>
                // </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
