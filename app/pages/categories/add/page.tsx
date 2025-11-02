"use client";
import { useState, useEffect, createElement } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchSession } from "@/utils/session";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TypographyH3 } from "@/components/custom/typography";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCategory } from "@/store/categories.store";
import { createCategorySchema } from "@/schema/categories.schema";
import { toast } from "sonner";
import { Home, Utensils, Car, ShoppingBag, Film, Heart, BookOpen, DollarSign, Gift, Plane, Zap, HomeIcon, Shield, CreditCard, TrendingUp, Package, SquareDashed } from 'lucide-react';
import { Card } from "@/components/ui/card";

export default function CreateCategory() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Validate user session
    useEffect(() => {
        fetchSession()
            .then(({session}) => {
                if (!session) {
                    router.push('/auth/login');
                }
            })
    }, []);

    const form = useForm<z.infer<typeof createCategorySchema>>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: "",
            type: "",
						icon: ""
        }
    });

    async function onSubmit(values: z.infer<typeof createCategorySchema>) {
        setIsLoading(true);

        createCategory(values)
            .then((category) => {
                toast.success(category.responseMessage);
                router.push('/pages/transactions');
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

		const icons = {
			home: Home,
			food: Utensils,
			car: Car,
			shopping: ShoppingBag,
			entertainment: Film,
			health: Heart,
			education: BookOpen,
			salary: DollarSign,
			gift: Gift,
			travel: Plane,
			utilities: Zap,
			rent: HomeIcon,
			insurance: Shield,
			loan: CreditCard,
			investment: TrendingUp,
			other: Package,
		};

    return (
		<main className='flex flex-col space-y-4 p-3'>
			<TypographyH3 className="font-bold text-center">
				Create New Category
			</TypographyH3>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
					<FormField
						control={form.control}
						name="icon"
						render={({ field }) => (
								<FormItem className="m-auto mb-4 flex flex-col justify-center items-center">
									<FormLabel className="text-md font-medium">
										Category Icon
									</FormLabel>
									<FormControl>
										<div className="flex items-center gap-2">
											<Drawer>
												<DrawerTrigger asChild>
													<div className="h-28 w-28 rounded-xl border-2 border-black bg-white cursor-pointer flex items-center justify-center">
														{field.value ? (
															createElement(icons[field.value as keyof typeof icons], { size: 60 })
														) : (
															<SquareDashed size={60} className="text-gray-400"/>
														)}
													</div>
												</DrawerTrigger>
												<DrawerContent className="max-h-[80vh] p-4">
														<DrawerHeader>
																<DrawerTitle>Select an Icon</DrawerTitle>
														</DrawerHeader>
														<div className="w-full grid grid-cols-4 gap-2 mb-4"> 
																{Object.keys(icons).map((iconName) => (
																		<div
																				key={iconName}
																				className="flex items-center justify-center"
																				onClick={() => {
																						field.onChange(iconName);
																				}}
																		>
																				<Card className="bg-primary border-2 w-full flex justify-center items-center text-white">
																						{createElement(icons[iconName as keyof typeof icons], {size: 32})}
																				</Card>
																		</div>
																))}
														</div>
														<DrawerFooter>
																<DrawerClose asChild>
																		<Button>
																				Done
																		</Button>
																</DrawerClose>
														</DrawerFooter>
												</DrawerContent>
												</Drawer>
										</div>
									</FormControl>
									<FormMessage className="text-center"/>
								</FormItem>
						)}
					/>
				 	<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="-space-y-1">
								<FormLabel className="text-md font-medium">
									Category Name
								</FormLabel>
								<FormControl>
									<Input
										required 
										placeholder="Category Name..." 
										{...field} 
										className="h-9 
										rounded-lg border-2 
										border-black bg-white"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem className="-space-y-1">
								<FormLabel className="text-md font-medium">
									Account Type
								</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange}>
										<SelectTrigger className="w-[180px] bg-white border-2 border-black w-full h-9">
											<SelectValue placeholder="Select Account Type..." />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="income">Income</SelectItem>
											<SelectItem value="expense">Expense</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex flex-row justify-between'>
						<Button
							onClick={() => router.back()}
							className="bg-red-500 border-2 hover:none"
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button 
							className="border-2" 
							type="submit" 
							disabled={isLoading}
						>
							{isLoading ? "Submitting..." : "Submit"}
						</Button>
					</div>
				</form>
			</Form>
		</main>
    );
};