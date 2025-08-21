import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HeartIcon, 
  InformationCircleIcon, 
  ArrowPathIcon,
  UserIcon,
  ClockIcon,
  ScaleIcon,
  ChartBarIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";

const OptionCard = ({ label, description, value, isSelected, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`p-6 rounded-xl border-2 cursor-pointer transition-all
      ${isSelected ? 'border-blue-500 bg-blue-900/30' : 'border-white/20 hover:border-blue-400/50'}
    `}
    whileHover={{ scale: 1.02 }}
  >
    <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
    <p className="text-sm text-gray-300">{description}</p>
    <div className="mt-4 text-xs text-blue-400">
      {isSelected ? '✓ Selected' : 'Click to select'}
    </div>
  </motion.div>
);

const NumericalInput = ({ label, unit, help, value, onChange, suggestions }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-white">
      <span className="font-medium">{label}</span>
      {unit && <span className="text-sm text-gray-400">({unit})</span>}
    </div>
    
    <div className="flex gap-3 flex-wrap">
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                 focus:outline-none focus:border-blue-400 text-white"
        placeholder={`Enter ${label}`}
      />
      
      {suggestions && (
        <div className="flex gap-2 flex-wrap">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onChange({ target: { value: suggestion } })}
              className="px-3 py-1.5 text-sm bg-white/5 rounded-lg hover:bg-white/10
                       border border-white/20 text-gray-300"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>

    {help && <p className="text-sm text-gray-400 mt-2">{help}</p>}
  </div>
);

const DefaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

const PredictionForm = ({ onSubmit, predictionResult, loading }) => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [stepDirection, setStepDirection] = useState(1);

  const fieldGroups = [
    ["age", "sex", "cp"],
    ["trestbps", "chol", "fbs"],
    ["restecg", "thalach", "exang"],
    ["oldpeak", "slope", "ca", "thal"],
  ];

  const fieldDetails = {
    age: {
      label: "Age",
      unit: "years",
      help: "Enter your age in years (29-77)",
      icon: UserIcon,
      suggestions: [30, 45, 60, 75]
    },
    sex: {
      label: "Biological Sex",
      icon: IdentificationIcon,
      options: [
        {
          value: 0,
          label: "Prefer not to say",
          description: "Keep this information private"
        },
        {
          value: 1,
          label: "Female",
          description: "Assigned female at birth"
        },
        {
          value: 2,
          label: "Male",
          description: "Assigned male at birth"
        }
      ]
    },
    cp: {
      label: "Chest Pain Type",
      icon: HeartIcon,
      options: [
        {
          value: 1,
          label: "Typical Angina",
          description: "Chest pain related to decreased blood flow to the heart"
        },
        {
          value: 2,
          label: "Atypical Angina",
          description: "Chest pain not typical of heart disease"
        },
        {
          value: 3,
          label: "Non-anginal Pain",
          description: "Chest pain not caused by reduced blood flow"
        },
        {
          value: 4,
          label: "Asymptomatic",
          description: "No chest pain symptoms"
        }
      ]
    },
    trestbps: {
      label: "Resting Blood Pressure",
      unit: "mm Hg",
      help: "Your blood pressure at rest (94-200)",
      icon: ScaleIcon,
      suggestions: [120, 140, 160, 180]
    },
    chol: {
      label: "Cholesterol Level",
      unit: "mg/dl",
      help: "Serum cholesterol in mg/dl (126-564)",
      icon: ClockIcon,
      suggestions: [200, 240, 280, 320]
    },
    fbs: {
      label: "Fasting Blood Sugar",
      icon: InformationCircleIcon,
      options: [
        {
          value: 0,
          label: "Not sure",
          description: "I don't know my fasting blood sugar"
        },
        {
          value: 1,
          label: "Normal (< 120 mg/dl)",
          description: "Fasting blood sugar below 120 mg/dl"
        },
        {
          value: 2,
          label: "High (> 120 mg/dl)",
          description: "Fasting blood sugar above 120 mg/dl"
        }
      ]
    },
    restecg: {
      label: "Resting ECG",
      icon: ChartBarIcon,
      options: [
        {
          value: 0,
          label: "Not sure",
          description: "I don't know my ECG results"
        },
        {
          value: 1,
          label: "Normal",
          description: "Normal resting electrocardiogram"
        },
        {
          value: 2,
          label: "ST-T Abnormality",
          description: "Abnormal ST-T wave changes"
        },
        {
          value: 3,
          label: "LV Hypertrophy",
          description: "Left ventricular hypertrophy"
        }
      ]
    },
    thalach: {
      label: "Max Heart Rate",
      unit: "bpm",
      help: "Highest heart rate achieved (71-202)",
      icon: UserIcon,
      suggestions: [120, 150, 180, 200]
    },
    exang: {
      label: "Exercise Angina",
      icon: HeartIcon,
      options: [
        {
          value: 0,
          label: "Not sure",
          description: "I don't know if I have exercise-induced angina"
        },
        {
          value: 1,
          label: "No",
          description: "No chest pain during exercise"
        },
        {
          value: 2,
          label: "Yes",
          description: "Experience chest pain during exercise"
        }
      ]
    },
    oldpeak: {
      label: "ST Depression",
      unit: "mm",
      help: "ST depression induced by exercise (0-6.2)",
      icon: ScaleIcon,
      suggestions: [1.0, 2.0, 3.0, 4.0]
    },
    slope: {
      label: "ST Slope",
      icon: ChartBarIcon,
      options: [
        {
          value: 0,
          label: "Not sure",
          description: "I don't know my ST slope results"
        },
        {
          value: 1,
          label: "Upsloping",
          description: "Upward sloping ST segment"
        },
        {
          value: 2,
          label: "Flat",
          description: "Flat ST segment"
        },
        {
          value: 3,
          label: "Downsloping",
          description: "Downward sloping ST segment"
        }
      ]
    },
    ca: {
      label: "Major Vessels",
      help: "Number of major vessels (0-4) colored by flourosopy",
      suggestions: [0, 1, 2, 3, 4]
    },
    thal: {
      label: "Thalassemia",
      icon: InformationCircleIcon,
      options: [
        {
          value: 0,
          label: "Not sure",
          description: "I don't know my thalassemia results"
        },
        {
          value: 1,
          label: "Normal",
          description: "Normal blood flow"
        },
        {
          value: 2,
          label: "Fixed Defect",
          description: "Permanent blood flow defect"
        },
        {
          value: 3,
          label: "Reversible Defect",
          description: "Temporary blood flow defect"
        }
      ]
    }
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key, 
        value === "" ? 0 : Number(value)
      ])
    );

    if (currentStep === fieldGroups.length - 1) {
      onSubmit(processedData);
    }
  };

  const handleStepChange = (newStep) => {
    const direction = newStep > currentStep ? 1 : -1;
    setStepDirection(direction);
    setCurrentStep(newStep);
  };

  const renderField = (field) => {
    const config = fieldDetails[field];
    const IconComponent = config?.icon || DefaultIcon;
    
    if (config?.options) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white mb-4">
            <IconComponent className="h-5 w-5 text-blue-400" />
            <h3 className="font-medium">{config.label}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.options.map((option) => (
              <OptionCard
                key={option.value}
                label={option.label}
                description={option.description}
                isSelected={formData[field] == option.value}
                onClick={() => setFormData({ ...formData, [field]: option.value })}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <NumericalInput
        label={config?.label || field}
        unit={config?.unit}
        help={config?.help}
        value={formData[field]}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
        suggestions={config?.suggestions}
      />
    );
  };

  return (
    <motion.div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ArrowPathIcon className="h-12 w-12 text-blue-400 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 mb-8">
        <HeartIcon className="h-8 w-8 text-red-500" />
        <h2 className="text-2xl font-bold text-white">
          Heart Health Assessment
        </h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-blue-400 hover:text-blue-300"
        >
          <InformationCircleIcon className="h-6 w-6" />
        </button>
      </div>

      {showHelp && (
        <motion.div
          className="bg-blue-900/30 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-gray-300 text-sm">
            Please provide accurate medical information for the best prediction results. All data is securely processed and never stored.
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <AnimatePresence mode="wait" custom={stepDirection}>
          <motion.div
            key={currentStep}
            custom={stepDirection}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {fieldGroups[currentStep].map((field) => (
              <div key={field} className="space-y-6">
                {renderField(field)}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={currentStep === 0}
            className="px-6 py-2 border border-white/20 text-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {currentStep < fieldGroups.length - 1 ? (
            <button
              type="button"
              onClick={() => handleStepChange(currentStep + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <motion.button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Prediction
            </motion.button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {predictionResult && (
          <motion.div
            className={`mt-8 p-6 rounded-lg ${
              predictionResult.includes("not likely")
                ? "bg-green-900/30 border-green-400/20"
                : "bg-red-900/30 border-red-400/20"
            } border`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {predictionResult.includes("not likely")
                ? "✅ Low Risk Detected"
                : "⚠️ Potential Risk Detected"}
            </h3>
            <p className="text-gray-300">{predictionResult}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PredictionForm;
