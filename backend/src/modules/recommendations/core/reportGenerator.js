import { generateRecommendations } from "./recommendationEngine.js";

const generateRootCauseSummary = (impactRecord) => {
  const { attackType, affectedEcus, severityReasons, vehicleImpact } = impactRecord.analysis;
  
  const attackName = attackType.replace(/_/g, " ").toLowerCase();
  const affectedList = affectedEcus && affectedEcus.length > 0 ? affectedEcus.join(", ") : "no ECUs";
  
  let summary = `The simulated ${attackName} attack compromised vehicle safety by affecting ${affectedList}.`;
  
  if (vehicleImpact && vehicleImpact.length > 0) {
    summary += ` Impact observed: ${vehicleImpact.join("; ")}.`;
  }
  
  if (severityReasons && severityReasons.length > 0) {
    summary += ` Severity factors: ${severityReasons.join("; ")}.`;
  }
  
  return summary;
};

export const buildFinalReport = (impactRecord) => {
  const analysis = impactRecord.analysis;
  const recommendations = generateRecommendations(analysis.attackType);
  const rootCauseSummary = generateRootCauseSummary(impactRecord);

  return {
    title: "Automotive Cybersecurity Final Analysis Report",
    executiveSummary: `${analysis.attackType} attack resulted in ${analysis.severity} severity with ${analysis.riskLevel} risk level.`,
    incidentDetails: {
      impactId: impactRecord.impactId,
      simulationRunId: impactRecord.simulationRunId,
      attackType: analysis.attackType,
      createdAt: impactRecord.createdAt
    },
    impactAssessment: {
      affectedEcus: analysis.affectedEcus || [],
      vehicleImpact: analysis.vehicleImpact || [],
      networkImpact: analysis.networkImpact || [],
      severity: analysis.severity,
      severityScore: analysis.severityScore,
      riskLevel: analysis.riskLevel,
      propagationPath: analysis.propagationPath || []
    },
    rootCauseSummary,
    recommendations,
    disclaimer: "This report is based on an isolated software simulation and is indicative only; it does not replace certified physical safety validation."
  };
};