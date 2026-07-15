import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TRANSACTION_STATUS = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const TaskForm = ({ open = true, onOpenChange }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    dueDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleStatusChange = (value) => {
    setFormValues({
      ...formValues,
      type: value,
    });
  };

  const handleCencel = () => {
    onOpenChange?.(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"sm:max-w-[500px]"}>
        <DialogHeader className={"text-lg font-semibold"}>
          <DialogTitle className={"text-sm text-muted-foreground"}>
            Create New Transaction
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new trasnsaction
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              name="title"
              id="title"
              value={formValues.title}
              placeholder="Enter transaction title"
              required
              onClick={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Amount *</Label>
            <Input
              name="amount"
              id="amount"
              value={formValues.amount}
              placeholder="Enter transaction amount"
              required
              onClick={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Select value={formValues.type} onValueChange={handleStatusChange}>
              <SelectTrigger className={"w-full max-w-ful"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TRANSACTION_STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCencel}>
            cencel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
