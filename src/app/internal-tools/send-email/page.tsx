"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormInviteInterview from "@/components/tools/invite-interview/FormInviteInterview"
import FormRejectInterview from "@/components/tools/reject-interview/FormRejectInterview"
import FormOfferLetter from "@/components/tools/offer-letter/FormOfferLetter"

export default function SendEmail() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 max-w-4xl">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Email Management</h1>
            <p className="text-base text-muted-foreground mt-2">
              Manage your email communications with candidates - from interview invitations to offer letters
            </p>
          </div>

          <Card className="mt-8 rounded-xl bg-card shadow-none">
            <Tabs defaultValue="invite-interview" className="w-full">
              <TabsList className="w-full justify-center my-4 gap-4">
                <TabsTrigger
                  value="invite-interview"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground w-full h-12 font-bold"
                >
                  Invite Interview
                </TabsTrigger>
                <TabsTrigger
                  value="reject-interview"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground w-full h-12 font-bold"
                >
                  Reject Interview
                </TabsTrigger>
                <TabsTrigger
                  value="offer-letter"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground w-full h-12 font-bold"
                >
                  Offer Letter
                </TabsTrigger>
              </TabsList>
              <TabsContent value="invite-interview">
                <FormInviteInterview />
              </TabsContent>
              <TabsContent value="reject-interview">
                <FormRejectInterview />
              </TabsContent>
              <TabsContent value="offer-letter">
                <FormOfferLetter />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
