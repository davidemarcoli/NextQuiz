"use client";

import { useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  quizName: z.string(),
  csvWords: z.string(),
  separator: z.string(),
});

export default function CreateQuiz() {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quizName: "",
      csvWords: "",
      separator: "\t",
    },
  });

  // const [formData, setFormData] = useState({
  //     quizName: "",
  //     csvWords: "",
  //     separator: "\t",
  // });
  //
  // function handleInput(event: any) {
  //     const {name, value} = event.target;
  //     setFormData((prev) => ({...prev, [name]: value}));
  // }
  //
  // function handleSeparator(newSeparator: string) {
  //     setFormData((prev) => ({...prev, separator: newSeparator}));
  // }

  function onSubmit(values: z.infer<typeof formSchema>) {

    // parse seperator
    values.separator =
      values.separator === "tab"
        ? "\t"
        : values.separator === "comma"
        ? ","
        : ";";

    // formData.csvWords is a csv string which is split by a tab
    // each line is a word and its definition
    const lines = values.csvWords.trim().split("\n").map(line => line.trim());
    const words = lines.map((line: string) => {
      const [term, definition] = line.split(values.separator);
      return {
        term,
        definition,
      };
    });

    console.table(words);

    fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.quizName,
        words,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        toast({
          title: "Quiz created",
          description: "Your quiz has been created",
        });
      });
  }

  return (
    <>
      <div className="z-10 w-full px-5 pt-10 xl:px-0">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20">
          <h1 className="text-6xl font-bold">
            Welcome to <a className="text-blue-600">Next Quiz!</a>
          </h1>
          <p className="mt-3 text-2xl">Get started by creating a quiz</p>

          {/*        <input placeholder="Quiz Name" name="quizName" onChange={handleInput}*/}
          {/*               className={`border border-black rounded-full px-2 py-1 mt-4`}/>*/}

          {/*        <div className="flex flex-row gap-4">*/}
          {/*            Separator:*/}
          {/*            <button className={`border border-black rounded-full px-2 py-1 ${*/}
          {/*                formData.separator === "\t" ? "bg-black text-white" : ""*/}
          {/*            }`} onClick={() => handleSeparator("\t")}>*/}
          {/*                Tab*/}
          {/*            </button>*/}
          {/*            <button className={`border border-black rounded-full px-2 py-1 ${*/}
          {/*                formData.separator === "," ? "bg-black text-white" : ""*/}
          {/*            }`} onClick={() => handleSeparator(",")}>*/}
          {/*                Comma*/}
          {/*            </button>*/}
          {/*            <button className={`border border-black rounded-full px-2 py-1 ${*/}
          {/*                formData.separator === ";" ? "bg-black text-white" : ""*/}
          {/*            }`} onClick={() => handleSeparator(";")}>*/}
          {/*                Semicolon*/}
          {/*            </button>*/}
          {/*        </div>*/}

          {/*        <textarea placeholder="CSV Words" name="csvWords" onChange={handleInput}/>*/}
          {/*        <button*/}
          {/*            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"*/}
          {/*            onClick={onSubmit}>*/}
          {/*            Create Quiz*/}
          {/*        </button>*/}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="m-16 w-96 space-y-8"
            >
              <FormField
                control={form.control}
                name="quizName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Name</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    {/*<FormDescription>*/}
                    {/*    This is your public display name.*/}
                    {/*</FormDescription>*/}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="separator"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Word Separator</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-col space-y-1"
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tab" id="tab" />
                          <Label htmlFor="tab">Tab</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="comma" id="comma" />
                          <Label htmlFor="comma">,</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="semicolon" id="semicolon" />
                          <Label htmlFor="semicolon">;</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    {/*<FormDescription>*/}
                    {/*    This is your public display name.*/}
                    {/*</FormDescription>*/}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="csvWords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CSV Words</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`term${
                          form.getValues().separator
                        }definition`}
                        {...field}
                      />
                    </FormControl>
                    {/*<FormDescription>*/}
                    {/*    This is your public display name.*/}
                    {/*</FormDescription>*/}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </main>
      </div>
    </>
  );
}
