"use client";

import { Camera } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useSettingsStore } from "../store/settings-store";

export function SettingsProfile() {
  const { currentUser } = useAuthStore();
  const { profile, updateProfile } = useSettingsStore();
  const [formData, setFormData] = useState({
    ...profile,
    firstName: profile.displayName.split(" ")[0] || "",
    lastName: profile.displayName.split(" ").slice(1).join(" ") || "",
  });

  const handleSave = () => {
    updateProfile({
      ...formData,
      displayName: `${formData.firstName} ${formData.lastName}`.trim(),
    });
    // Show success toast or notification
  };

  const hasChanges =
    JSON.stringify({ ...formData, displayName: undefined }) !==
    JSON.stringify({ ...profile, firstName: undefined, lastName: undefined });

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Personal Info Section */}
      <div className="p-4 border border-border rounded-xl bg-background/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-5 items-start">
          {/* Avatar Section (Left) */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="relative group cursor-pointer">
              <Avatar className="size-14 border-2 border-border shadow-sm">
                <AvatarImage
                  src={currentUser?.avatar_url ?? undefined}
                  alt={currentUser?.display_name ?? ""}
                  className="object-cover"
                />
                <AvatarFallback className="text-sm">
                  {(currentUser?.display_name ?? "?").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="size-4 text-white" />
              </div>
            </div>
            <button className="text-[11px] font-medium text-primary hover:underline">
              Change
            </button>
          </div>

          {/* Info Section (Right) */}
          <div className="flex-1 w-full space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field orientation="vertical" className="space-y-1">
                <FieldLabel className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  First Name
                </FieldLabel>
                <Input
                  className="h-8 text-[13px]"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="First Name"
                />
              </Field>

              <Field orientation="vertical" className="space-y-1">
                <FieldLabel className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Last Name
                </FieldLabel>
                <Input
                  className="h-8 text-[13px]"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                />
              </Field>
            </div>

            <Field orientation="vertical" className="space-y-1">
              <FieldLabel className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Username
              </FieldLabel>
              <InputGroup className="h-8">
                <InputGroupAddon align="inline-start">
                  <InputGroupText className="text-[13px]">@</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  className="h-8 text-[13px]"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="username"
                />
              </InputGroup>
            </Field>

            <Field orientation="vertical" className="space-y-1">
              <FieldLabel className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Bio
              </FieldLabel>
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Share a little about your background..."
                rows={2}
                className="resize-none min-h-[60px] text-[13px]"
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="p-4 border border-border rounded-xl bg-background/50 backdrop-blur-sm space-y-3">
        <h3 className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground">
          Social Links
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5">
          <Field orientation="vertical">
            <InputGroup className="h-8">
              <InputGroupAddon
                align="inline-start"
                className="min-w-[100px] bg-muted/50"
              >
                <InputGroupText className="text-[11px]">
                  instagram.com/
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                className="h-8 text-[13px]"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
                placeholder="username"
              />
            </InputGroup>
          </Field>

          <Field orientation="vertical">
            <InputGroup className="h-8">
              <InputGroupAddon
                align="inline-start"
                className="min-w-[60px] bg-muted/50"
              >
                <InputGroupText className="text-[11px]">x.com/</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                className="h-8 text-[13px]"
                value={formData.twitter}
                onChange={(e) =>
                  setFormData({ ...formData, twitter: e.target.value })
                }
                placeholder="username"
              />
            </InputGroup>
          </Field>

          <Field orientation="vertical">
            <InputGroup className="h-8">
              <InputGroupAddon
                align="inline-start"
                className="min-w-[100px] bg-muted/50"
              >
                <InputGroupText className="text-[11px]">
                  youtube.com/@
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                className="h-8 text-[13px]"
                value={formData.youtube}
                onChange={(e) =>
                  setFormData({ ...formData, youtube: e.target.value })
                }
                placeholder="username"
              />
            </InputGroup>
          </Field>

          <Field orientation="vertical">
            <InputGroup className="h-8">
              <InputGroupAddon
                align="inline-start"
                className="min-w-[90px] bg-muted/50"
              >
                <InputGroupText className="text-[11px]">
                  tiktok.com/@
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                className="h-8 text-[13px]"
                value={formData.tiktok}
                onChange={(e) =>
                  setFormData({ ...formData, tiktok: e.target.value })
                }
                placeholder="username"
              />
            </InputGroup>
          </Field>

          <Field orientation="vertical">
            <InputGroup className="h-8">
              <InputGroupAddon
                align="inline-start"
                className="min-w-[100px] bg-muted/50"
              >
                <InputGroupText className="text-[11px]">
                  linkedin.com/in/
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                className="h-8 text-[13px]"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
                placeholder="handle"
              />
            </InputGroup>
          </Field>

          <Field orientation="vertical">
            <Input
              className="h-8 text-[13px]"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="Your website"
              type="url"
            />
          </Field>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-start">
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="rounded-lg px-5 h-8 text-[11px] font-semibold"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
