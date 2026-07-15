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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/apiClient";
import { toast } from "sonner";

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

    const [validateError, setValidateError] = useState(null);

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
    const queryClient = useQueryClient();
    //   create post of transaction
    const createMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post("/transaction", userData);
            console.log("response data", response.data);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("Task Created Successfully");
            queryClient.invalidateQueries(["transaction"]);
            onOpenChange?.(false);
            setFormValues({
                title: "",
                amount: "",
                type: "",
                category: "",
                dueDate: "",
            });
        },
        onError: (error) => {
            toast.error("Error Transaction");
            console.log("Error Transaction", error);
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValues.title) {
            setValidateError("Title is required");
            return;
        }
        const taskData = {
            title: formValues.title.trim(),
            amount: formValues.amount.trim(),
            type: formValues.type,
            category: formValues.category,
            dueDate: formValues.dueDate
                ? new Date(formValues.dueDate).toISOString()
                : null,
        };
        createMutation.mutate(taskData);
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input
                            name="title"
                            id="title"
                            value={formValues.title}
                            placeholder="Enter transaction title"
                            required
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                    <div className="space-y-2">
                        <Label>Category *</Label>
                        <Input
                            name="category"
                            id="category"
                            value={formValues.category}
                            placeholder="Enter transaction category"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Due Date *</Label>
                        <Input
                            name="dueDate"
                            id="dueDate"
                            value={formValues.dueDate}
                            placeholder="Enter transaction category"
                            required
                            type={"date"}
                            onChange={handleInputChange}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleCencel}>
                            cencel
                        </Button>

                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
};

export default TaskForm;
