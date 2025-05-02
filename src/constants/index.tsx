import { FlashIcon, RealTimeMonitoring, SupportIcon } from "../components/Icon";

export const featureList = [
    {
        title: "Secure Testing & Reporting Environment",
        note: "Test your product in a safe, monitored space with structured feedback and transparent reporting.",
        Icon: FlashIcon,
        points: [
            "Application + test case assignment.",
            "Upload progress & documentation.",
            "Auto test pass/fail simulation."
        ]
    },
    {
        title: "AI-Guided Compliance Support",
        note: "Get instant help navigating regulations with AI-powered tools built on NDPR and sandbox rules.y",
        Icon: SupportIcon,
        points: [
            "Compliance chatbot.",
            "Risk flagging.",
            "AI-generated test cases."
        ]
    },
    {
        title: "Real-Time Monitoring & Admin Oversight",
        note: "Track every step of your sandbox journey—from application to final approval—all in one place.",
        Icon: RealTimeMonitoring,
        points: [
            "Dashboard for status & feedback.",
            "Admin controls & review tools.",
            "Commenting, approvals, and progress logs."
        ]
    }
]

export const steps = [
    {
        title: "Apply To Sandbox",
        description: "Submit your innovative solution and required documents."
    },
    {
        title: "Get Reviewed",
        description: "NITDA assesses risk with AI-powered summaries."
    },
    {
        title: "Test Safely",
        description: "Complete assigned compliance test cases."
    },
    {
        title: "Receive Feedback",
        description: "Track your progress and complete your evaluation."
    }
];