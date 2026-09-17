import { buildFinalReport } from "./core/reportGenerator.js";
import { createReport, getReportById, getReportByImpactId, listReports } from "./core/reportStore.js";
import { getImpactAnalysis } from "../impactAnalysis/impact.service.js";

export class ImpactAnalysisNotFoundError extends Error {
  constructor(impactId) {
    super(`Impact analysis ${impactId} was not found.`);
    this.name = "ImpactAnalysisNotFoundError";
  }
}

export const createFinalReport = (impactId) => {
  // Check if report already exists
  const existing = getReportByImpactId(impactId);
  if (existing) {
    return existing;
  }

  // Get impact analysis using your existing function name
  const impactRecord = getImpactAnalysis(impactId);
  
  if (!impactRecord) {
    throw new ImpactAnalysisNotFoundError(impactId);
  }

  if (impactRecord.status !== "COMPLETED") {
    throw new Error(`Impact analysis ${impactId} is not completed.`);
  }

  // Generate report content
  const reportContent = buildFinalReport(impactRecord);

  // Store report
  const report = createReport({
    impactId,
    attackType: impactRecord.analysis.attackType,
    severity: impactRecord.analysis.severity,
    severityScore: impactRecord.analysis.severityScore,
    riskLevel: impactRecord.analysis.riskLevel,
    affectedEcus: impactRecord.analysis.affectedEcus,
    content: reportContent
  });

  return report;
};

export const getReport = (reportId) => {
  const report = getReportById(reportId);
  if (!report) {
    throw new Error(`Report ${reportId} not found.`);
  }
  return report;
};

export const getAllReports = () => {
  return listReports();
};