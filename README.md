# PsyCanvas - Psychological Drawing Analysis Platform

**PsyCanvas** is a comprehensive web application for psychological analysis of children's drawings. The platform combines advanced drawing interpretation techniques with psychological assessment questionnaires to provide detailed insights into a child's emotional and psychological state.

## 🎯 Project Overview

PsyCanvas is designed to help psychologists, educators, and parents understand children's psychological development through the analysis of their drawings. The application uses a standardized approach based on established psychological drawing assessment methods, particularly the House-Tree-Person (HTP) test and animal drawing analysis.

## ✨ Key Features

### 1. **Multi-Stage Drawing Upload**

- Upload three specific types of drawings:
  - **House drawing** - Reveals feelings about home, family, and security
  - **Animal drawing** - Shows personality traits, social attitudes, and inner emotions
  - **Self-portrait** - Indicates self-perception, confidence, and identity
- Support for multiple image formats (JPG, JPEG, PNG, GIF)
- File size validation (max 5MB per image)
- Real-time preview of uploaded images

### 2. **Comprehensive Psychological Questionnaire**

The questionnaire consists of multiple assessment areas:

#### **Child Information**

- Child's name, birth date, and gender
- Parent/guardian information

#### **Psychological Assessment Areas**

- **Emotional Sphere** (4 questions)

  - Joy and pleasure expression
  - Anger and frustration patterns
  - Sadness and crying behaviors
  - Overall emotional regulation

- **Social Interaction** (4 questions)

  - Friendship formation abilities
  - Social engagement preferences
  - Group vs. individual play preferences
  - Communication patterns

- **Self-Regulation and Behavior** (4 questions)

  - Rule-following capabilities
  - Instruction comprehension
  - Impulse control assessment
  - Behavioral consistency

- **Relationships and Self-Confidence** (4 questions)

  - Self-efficacy beliefs
  - Confidence in abilities
  - Self-doubt patterns
  - Relationship quality

- **General Assessment** (2 questions)
  - Overall emotional state evaluation
  - Additional behavioral observations

### 3. **Detailed Psychological Report Generation**

The application generates comprehensive reports including:

#### **Brief Summary**

- Main psychological qualities identified
- Key insights from each drawing type
- Overall assessment overview

#### **Detailed Analysis**

- **House-Tree-Person Analysis**

  - Element-by-element breakdown
  - Psychological meaning interpretation
  - General conclusions

- **Animal Drawing Analysis**

  - Animal choice significance
  - Drawing details interpretation
  - Pose and expression analysis

- **Self-Portrait Analysis**
  - Figure size interpretation
  - Facial expression analysis
  - Additional detail significance

#### **Questionnaire Scoring**

Visual and numerical scoring across five key areas:

- Emotional Stability
- Social Adaptation
- Self-Regulation
- Communication Skills
- Self-Esteem

#### **Professional Recommendations**

- Targeted suggestions for development
- Areas requiring attention
- Positive reinforcement strategies

### 4. **User Experience Features**

- **Progress Tracking**: Visual step indicator showing current progress
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Validation**: Immediate feedback on form inputs
- **Loading States**: Clear feedback during processing
- **Error Handling**: User-friendly error messages
- **PDF Export**: Downloadable reports for record-keeping

## 🛠 Technical Stack

- **Frontend**: Next.js 15.3.3 with React 19
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript 5
- **Development**: ESLint for code quality
- **Package Manager**: Yarn/npm

## 📋 System Requirements

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun package manager
- Modern web browser with JavaScript enabled
- Internet connection for API communication

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd psycanvas
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 API Integration

The application integrates with a backend API for:

- Image upload and processing
- Questionnaire data submission
- Report generation and retrieval

**API Endpoints:**

- Upload: `https://sirius-draw-test-94500a1b4a2f.herokuapp.com/upload`
- Survey: `https://sirius-draw-test-94500a1b4a2f.herokuapp.com/submit-survey`
- Reports: `https://sirius-draw-test-94500a1b4a2f.herokuapp.com/get-report/{task_id}`

## 📱 Usage Workflow

1. **Upload Drawings**: Upload house, animal, and self-portrait drawings
2. **Complete Questionnaire**: Fill out the comprehensive psychological assessment
3. **Generate Report**: Receive detailed analysis and recommendations
4. **Download/Share**: Export results as PDF or share findings

## 🎨 UI/UX Features

- **Clean, Modern Interface**: Intuitive design focused on ease of use
- **Step-by-Step Guidance**: Clear progression through the assessment process
- **Visual Feedback**: Immediate response to user actions
- **Accessibility**: Designed with accessibility best practices
- **Mobile Responsive**: Full functionality across all device sizes

## 📊 Assessment Methodology

The application is based on established psychological assessment techniques:

- **House-Tree-Person (HTP) Test**: A projective psychological test
- **Animal Drawing Analysis**: Personality and emotional assessment
- **Self-Portrait Evaluation**: Self-perception and confidence analysis
- **Standardized Questionnaire**: Multi-dimensional psychological evaluation

## 🔒 Privacy & Security

- Secure file upload and processing
- Data protection during transmission
- User privacy considerations built into the design
- No permanent storage of sensitive information

## 🤝 Contributing

This is a professional psychological assessment tool. Contributions should maintain:

- High code quality standards
- Psychological assessment accuracy
- User privacy protection
- Professional ethical guidelines

## 📞 Support

For technical support or questions about psychological interpretations, please consult with qualified professionals in child psychology and development.

---

**Note**: This application is designed as a supplementary tool for psychological assessment. Professional interpretation by qualified psychologists is recommended for clinical use.
