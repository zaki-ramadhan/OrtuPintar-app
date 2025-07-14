import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Helper function to format date
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

// Helper function to format time duration
const formatDuration = (timeSpent) => {
  if (!timeSpent || timeSpent === 0) return "0 minutes";

  // timeSpent is in hours (decimal), convert to minutes
  const totalMinutes = Math.round(timeSpent * 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}m`
    : `${hours} hours`;
};

// Main PDF export function
export const exportChildReportToPDF = async (
  reportData,
  currentChild,
  dateRange = "week"
) => {
  try {
    console.log("🖨️ Starting PDF export for:", currentChild?.name);

    if (!currentChild) {
      throw new Error("No child selected for export");
    }

    if (!reportData) {
      throw new Error("No report data available for export");
    }

    // Create new PDF document
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 25; // Increased margin for better spacing
    const contentWidth = pageWidth - margin * 2;

    let currentY = margin;

    // Helper function to add new page if needed
    const checkPageBreak = (requiredHeight) => {
      if (currentY + requiredHeight > pageHeight - margin - 20) {
        // Extra bottom margin
        pdf.addPage();
        currentY = margin + 15; // Start with some top padding
        return true;
      }
      return false;
    };

    // Helper function to add text with auto-wrap
    const addText = (text, x, y, options = {}) => {
      try {
        const fontSize = options.fontSize || 10;
        const fontStyle = options.fontStyle || "normal";
        const maxWidth = options.maxWidth || contentWidth;
        const lineHeight = options.lineHeight || fontSize * 0.45; // Better line spacing

        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", fontStyle);

        // Ensure text is a string
        const textString = text ? text.toString() : "";
        const lines = pdf.splitTextToSize(textString, maxWidth);

        lines.forEach((line, index) => {
          if (checkPageBreak(lineHeight)) {
            y = currentY;
          }
          pdf.text(line, x, y + index * lineHeight);
        });

        return y + lines.length * lineHeight;
      } catch (error) {
        console.error("Error in addText:", error);
        return y + 12; // Return a safe fallback
      }
    };

    // Helper function to add section divider
    const addSectionDivider = () => {
      currentY += 8;
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.3);
      pdf.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 12;
    };

    // 1. Header Section with Professional Design
    const headerHeight = 55;

    // Main header background with gradient effect
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, pageWidth, headerHeight, "F");

    // Secondary accent strip
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, headerHeight - 8, pageWidth, 8, "F");

    // Logo/Title with better positioning
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(32);
    pdf.setFont("helvetica", "bold");
    pdf.text("OrtuPintar", margin, 28);

    // Add logo subtitle with professional spacing
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "normal");
    pdf.text("Child Development Report", margin, 43);

    // Date stamp in header
    pdf.setFontSize(10);
    pdf.text(
      `Generated: ${new Date().toLocaleDateString("en-US")}`,
      pageWidth - margin - 45,
      43
    );

    currentY = headerHeight + 20;

    // 2. Child Information Section with Card Design
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Child Information", margin, currentY);
    currentY += 22;

    // Professional card design for child info
    const childInfoCardHeight = 42;

    // Card shadow effect
    pdf.setFillColor(0, 0, 0, 0.1);
    pdf.rect(margin + 2, currentY + 2, contentWidth, childInfoCardHeight, "F");

    // Main card background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, currentY, contentWidth, childInfoCardHeight, "F");

    // Card border
    pdf.setDrawColor(229, 231, 235);
    pdf.setLineWidth(1);
    pdf.rect(margin, currentY, contentWidth, childInfoCardHeight, "S");

    // Left accent bar
    pdf.setFillColor(59, 130, 246);
    pdf.rect(margin, currentY, 4, childInfoCardHeight, "F");

    // Content with proper spacing
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    currentY += 15;
    pdf.text(`${currentChild.name}`, margin + 15, currentY);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(75, 85, 99);
    currentY += 8;
    pdf.text(`Age: ${currentChild.age} years old`, margin + 15, currentY);

    currentY += 6;
    pdf.text(
      `Report Generated: ${formatDate(new Date())}`,
      margin + 15,
      currentY
    );

    currentY += 25;

    // 3. Performance Overview with Dashboard-style Cards
    addSectionDivider();

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.text("Performance Overview", margin, currentY);
    currentY += 25;

    const stats = reportData.overview || {};

    checkPageBreak(85);

    // Create dashboard-style stat cards
    const cardWidth = (contentWidth - 15) / 3; // 3 cards per row with spacing
    const statCardHeight = 35;
    const cardSpacing = 7.5;

    const statCards = [
      {
        label: "Total Activities",
        value: (stats.totalActivities || 0).toString(),
        color: [59, 130, 246],
      },
      {
        label: "Achievements",
        value: (stats.completedMilestones || 0).toString(),
        color: [34, 197, 94],
      },
      {
        label: "Completion Rate",
        value: `${stats.completionRate || 0}%`,
        color: [168, 85, 247],
      },
      {
        label: "Total Time",
        value: formatDuration(stats.totalTimeSpent || 0),
        color: [245, 158, 11],
      },
      {
        label: "Daily Streak",
        value: `${stats.activeStreak || 0} days`,
        color: [239, 68, 68],
      },
      {
        label: "Last Activity",
        value: stats.lastActivity || "None yet",
        color: [107, 114, 128],
      },
    ];

    // Draw stat cards in 2 rows
    for (let i = 0; i < statCards.length; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = margin + col * (cardWidth + cardSpacing);
      const y = currentY + row * (statCardHeight + 10);

      const card = statCards[i];

      // Card shadow
      pdf.setFillColor(0, 0, 0, 0.1);
      pdf.rect(x + 1, y + 1, cardWidth, statCardHeight, "F");

      // Card background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(x, y, cardWidth, statCardHeight, "F");

      // Card border
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.5);
      pdf.rect(x, y, cardWidth, statCardHeight, "S");

      // Colored top border
      pdf.setFillColor(card.color[0], card.color[1], card.color[2]);
      pdf.rect(x, y, cardWidth, 3, "F");

      // Card content
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(card.color[0], card.color[1], card.color[2]);

      // Center the value text
      const valueWidth = pdf.getTextWidth(card.value);
      pdf.text(card.value, x + (cardWidth - valueWidth) / 2, y + 18);

      // Label
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(107, 114, 128);
      const labelWidth = pdf.getTextWidth(card.label);
      pdf.text(card.label, x + (cardWidth - labelWidth) / 2, y + 28);
    }

    currentY += 85;

    // 4. Recent Activities Section with Enhanced Design
    addSectionDivider();

    if (reportData.recentActivities && reportData.recentActivities.length > 0) {
      checkPageBreak(35);

      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text("Recent Activities", margin, currentY);
      currentY += 25;

      const activitiesToShow = reportData.recentActivities.slice(0, 5);

      activitiesToShow.forEach((activity, index) => {
        const activityHeight = 38;
        checkPageBreak(activityHeight);

        // Modern card design for activities
        const isCompleted = activity.status === "completed";

        // Card shadow
        pdf.setFillColor(0, 0, 0, 0.05);
        pdf.rect(
          margin + 1,
          currentY + 1,
          contentWidth,
          activityHeight - 2,
          "F"
        );

        // Card background with status-based styling
        const bgColor = isCompleted ? [248, 250, 252] : [254, 252, 232];
        pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
        pdf.rect(margin, currentY, contentWidth, activityHeight - 2, "F");

        // Status indicator bar
        const statusColor = isCompleted ? [34, 197, 94] : [245, 158, 11];
        pdf.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
        pdf.rect(margin, currentY, 5, activityHeight - 2, "F");

        // Card border
        pdf.setDrawColor(229, 231, 235);
        pdf.setLineWidth(0.5);
        pdf.rect(margin, currentY, contentWidth, activityHeight - 2, "S");

        currentY += 12;

        // Activity number badge - simplified without circle
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(59, 130, 246);
        pdf.text(`${index + 1}.`, margin + 15, currentY);

        // Activity title with improved typography
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 0, 0);
        const activityTitle =
          activity.title ||
          activity.activityName ||
          activity.activityTitle ||
          "Unknown Activity";

        const maxTitleWidth = contentWidth - 40;
        const truncatedTitle =
          pdf.splitTextToSize(activityTitle, maxTitleWidth)[0] || activityTitle;
        pdf.text(truncatedTitle, margin + 30, currentY);

        // Status badge
        const statusText = isCompleted
          ? "Completed"
          : activity.status === "in_progress"
          ? "In Progress"
          : "Pending";

        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(255, 255, 255);
        pdf.setFillColor(statusColor[0], statusColor[1], statusColor[2]);

        const badgeWidth = 25;
        const badgeX = pageWidth - margin - badgeWidth - 5;
        pdf.rect(badgeX, currentY - 5, badgeWidth, 10, "F");
        pdf.text(statusText, badgeX + 2, currentY + 1);

        // Activity details
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(107, 114, 128);
        currentY += 10;

        const categoryText = activity.category || "Uncategorized";
        let timeText = "No date available";

        try {
          if (activity.completed_at) {
            timeText = new Date(activity.completed_at).toLocaleDateString(
              "en-US"
            );
          } else if (activity.updated_at) {
            timeText = new Date(activity.updated_at).toLocaleDateString(
              "en-US"
            );
          }
        } catch (dateError) {
          timeText = "Invalid date";
        }

        pdf.text(`Category: ${categoryText}`, margin + 30, currentY);
        pdf.text(`Date: ${timeText}`, margin + contentWidth / 2 + 10, currentY);

        currentY += 22;
      });
    } else {
      // Enhanced empty state
      checkPageBreak(50);

      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("Recent Activities", margin, currentY);
      currentY += 30;

      // Empty state card
      pdf.setFillColor(249, 250, 251);
      pdf.rect(margin, currentY, contentWidth, 35, "F");
      pdf.setDrawColor(209, 213, 219);
      pdf.setLineWidth(1);
      pdf.rect(margin, currentY, contentWidth, 35, "S");

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(107, 114, 128);
      currentY += 20;

      const emptyText =
        "No activities recorded yet. Start your learning journey!";
      const textWidth = pdf.getTextWidth(emptyText);
      pdf.text(emptyText, margin + (contentWidth - textWidth) / 2, currentY);
      currentY += 30;
    }

    // 5. Milestone Achievements with Enhanced Visual Design
    addSectionDivider();

    if (stats.completedMilestones && stats.completedMilestones > 0) {
      checkPageBreak(55);
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text("Achievement Status", margin, currentY);
      currentY += 25;

      // Success celebration card
      const celebrationHeight = 40;

      // Card with gradient-like effect
      pdf.setFillColor(240, 253, 244);
      pdf.rect(margin, currentY, contentWidth, celebrationHeight, "F");

      // Success border with rounded corners effect
      pdf.setDrawColor(34, 197, 94);
      pdf.setLineWidth(2);
      pdf.rect(margin, currentY, contentWidth, celebrationHeight, "S");

      // Achievement text
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(21, 128, 61);
      pdf.text("✓ Excellent Progress!", margin + 20, currentY + 15);

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      currentY = addText(
        `Your child has successfully achieved ${
          stats.completedMilestones
        } milestone${
          stats.completedMilestones > 1 ? "s" : ""
        }! This demonstrates outstanding progress across various learning areas.`,
        margin + 20,
        currentY + 22,
        { maxWidth: contentWidth - 40, lineHeight: 6 }
      );
      currentY += 25;
    } else {
      // Motivational encouragement card
      checkPageBreak(55);
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text("Milestone Progress", margin, currentY);
      currentY += 25;

      // Encouragement card
      const encouragementHeight = 40;

      pdf.setFillColor(254, 249, 195);
      pdf.rect(margin, currentY, contentWidth, encouragementHeight, "F");

      pdf.setDrawColor(245, 158, 11);
      pdf.setLineWidth(2);
      pdf.rect(margin, currentY, contentWidth, encouragementHeight, "S");

      // Encouragement text
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(146, 64, 14);
      pdf.text("→ Keep Going!", margin + 20, currentY + 15);

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      currentY = addText(
        "The journey has just begun! Continue engaging with activities to unlock your first milestone achievement.",
        margin + 20,
        currentY + 22,
        { maxWidth: contentWidth - 40, lineHeight: 6 }
      );
      currentY += 25;
    }

    // 6. Recommendations Section with Professional Layout
    addSectionDivider();

    checkPageBreak(65);

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.text("Recommendations", margin, currentY);
    currentY += 25;

    const recommendations = [
      {
        color: [34, 197, 94], // Green
        title: "Maintain Consistency",
        text: "Continue with daily activities to build strong learning habits and routine.",
      },
      {
        color: [59, 130, 246], // Blue
        title: "Personalized Learning",
        text: "Focus on activities that align with your child's interests and developmental stage.",
      },
      {
        color: [245, 158, 11], // Orange
        title: "Positive Reinforcement",
        text: "Celebrate achievements and provide encouragement to boost motivation.",
      },
      {
        color: [168, 85, 247], // Purple
        title: "Diverse Activities",
        text: "Vary activity types to develop different skills and prevent learning plateaus.",
      },
      {
        color: [239, 68, 68], // Red
        title: "Goal Setting",
        text: "Set achievable milestones and celebrate progress along the learning journey.",
      },
    ];

    recommendations.forEach((rec, index) => {
      checkPageBreak(20);

      // Recommendation card design
      const recommendationCardHeight = 18;

      // Alternating background colors
      const bgColor = index % 2 === 0 ? [249, 250, 251] : [255, 255, 255];
      pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      pdf.rect(margin, currentY, contentWidth, recommendationCardHeight, "F");

      // Left border accent
      pdf.setFillColor(59, 130, 246);
      pdf.rect(margin, currentY, 3, recommendationCardHeight, "F");

      currentY += 6;

      // Title with simple bullet point
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text(`• ${rec.title}`, margin + 15, currentY);

      // Description
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(75, 85, 99);
      currentY += 8;

      currentY = addText(rec.text, margin + 15, currentY, {
        maxWidth: contentWidth - 25,
        lineHeight: 5,
      });
      currentY += 8;
    });

    // 7. Professional Footer with Branding
    const footerY = pageHeight - 35;

    // Footer separator with gradient effect
    pdf.setDrawColor(59, 130, 246);
    pdf.setLineWidth(2);
    pdf.line(margin, footerY - 15, pageWidth - margin, footerY - 15);

    pdf.setDrawColor(147, 197, 253);
    pdf.setLineWidth(0.5);
    pdf.line(margin, footerY - 13, pageWidth - margin, footerY - 13);

    // Footer content with professional styling
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(59, 130, 246);
    pdf.text("OrtuPintar", margin, footerY - 5);

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(107, 114, 128);
    pdf.text("Educational Platform for Children", margin + 25, footerY - 5);

    // Generation timestamp
    pdf.setFontSize(9);
    pdf.text(
      `Report generated on ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      pageWidth - margin - 85,
      footerY - 5
    );

    // Confidentiality notice
    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175);
    const confidentialText =
      "This report contains confidential information about your child's learning progress.";
    const confTextWidth = pdf.getTextWidth(confidentialText);
    pdf.text(
      confidentialText,
      margin + (contentWidth - confTextWidth) / 2,
      footerY + 5
    );

    // Save the PDF with enhanced filename
    const fileName = `OrtuPintar_Report_${currentChild.name.replace(
      /\s+/g,
      "_"
    )}_${new Date().toISOString().split("T")[0]}.pdf`;
    pdf.save(fileName);

    console.log("✅ PDF export completed:", fileName);
    return { success: true, fileName };
  } catch (error) {
    console.error("❌ Error exporting PDF:", error);
    throw error;
  }
};

// Alternative method using HTML to Canvas for more complex layouts
export const exportReportWithScreenshot = async (elementId, fileName) => {
  try {
    console.log("📸 Exporting via screenshot method...");

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`);
    }

    // Configure html2canvas options
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate dimensions to fit page
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Center the image
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
    pdf.save(fileName);

    console.log("✅ Screenshot PDF export completed");
    return { success: true, fileName };
  } catch (error) {
    console.error("❌ Error in screenshot export:", error);
    throw error;
  }
};
