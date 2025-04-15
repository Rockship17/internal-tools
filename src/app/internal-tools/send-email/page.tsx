"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormInviteInterview from "@/components/tools/invite-interview/FormInviteInterview"
import FormRejectInterview from "@/components/tools/reject-interview/FormRejectInterview"
import FormOfferLetter from "@/components/tools/offer-letter/FormOfferLetter"
export default function SendEmail() {
  return (
    <div className="bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Email Management</h1>
            <p className="text-base text-gray-600 mt-2">
              Manage your email communications with candidates - from interview invitations to offer letters
            </p>
          </div>

          <Card className="rounded-xl !border-none shadow-none">
            <Tabs className="!border-none" defaultValue="invite-interview">
              <TabsList className="bg-white w-full justify-center my-4">
                <TabsTrigger value="invite-interview" className="w-full h-12">
                  Invite Interview
                </TabsTrigger>
                <TabsTrigger value="reject-interview" className="w-full h-12">
                  Reject Interview
                </TabsTrigger>
                <TabsTrigger value="offer-letter" className="w-full h-12">
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
