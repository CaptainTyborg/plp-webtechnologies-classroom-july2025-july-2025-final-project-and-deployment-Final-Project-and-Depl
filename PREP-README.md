# PREP - JAMB Practice Platform

![PREP Logo](https://img.shields.io/badge/PREP-JAMB%20Practice-6366f1?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

**Practice • Review • Excel • Pass**

A comprehensive web-based JAMB (Joint Admissions and Matriculation Board) exam preparation platform that simulates the real exam experience with realistic timing, calculator functionality, and instant results.

---

## 🎯 Features

### Core Functionality
- ✅ **4 Subject Selection** - Choose any 4 subjects from 8 available options
- ⏱️ **120-Minute Timer** - Authentic JAMB exam duration with countdown
- 🧮 **Built-in Calculator** - Full-featured calculator available during exam
- 📊 **Instant Results** - Detailed performance analysis by subject
- 🌓 **Dark Mode** - Eye-friendly theme toggle
- 📱 **Responsive Design** - Works seamlessly on all devices
- 💾 **Progress Tracking** - Visual indicators for answered/unanswered questions
- 🔄 **Subject Navigation** - Switch between subjects during exam
- ⚡ **Auto-Submit** - Automatic submission when time expires

### Available Subjects
1. **Use of English** - Grammar, comprehension, and vocabulary
2. **Mathematics** - Algebra, geometry, and calculations
3. **Physics** - Mechanics, electricity, and waves
4. **Chemistry** - Organic, inorganic, and physical chemistry
5. **Biology** - Cell biology, genetics, and ecology
6. **Economics** - Micro and macroeconomics concepts
7. **Commerce** - Business and trade principles
8. **Government** - Political science and civics

---

## 📁 Project Structure

```
prep/
│
├── index.html              # Landing page
├── subjects.html           # Subject selection page
├── exam.html              # Main exam interface
├── results.html           # Results display page
│
├── styles.css             # Main stylesheet (with dark mode)
│
├── theme.js               # Theme toggle functionality
├── subjects.js            # Subject selection logic
├── exam.js                # Exam core functionality
├── results.js             # Results calculation and display
│
├── questions.json         # Question database (40 per subject)
│
└── README.md             # Documentation (this file)
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- No server required - runs entirely in the browser

### Installation

1. **Download all files** to a single folder:
   ```
   prep/
   ├── index.html
   ├── subjects.html
   ├── exam.html
   ├── results.html
   ├── styles.css
   ├── theme.js
   ├── subjects.js
   ├── exam.js
   ├── results.js
   └── questions.json
   ```

2. **Open `index.html`** in your web browser

3. **Start practicing!**

### Quick Start Guide

1. **Home Page** - Click "Start Practice Exam"
2. **Select Subjects** - Choose exactly 4 subjects (checkboxes turn blue when selected)
3. **Take Exam** - Answer questions with 2-hour timer running
4. **Use Calculator** - Click calculator button for math calculations
5. **Submit** - Click submit button or wait for auto-submit
6. **View Results** - See your score breakdown by subject

---

## 💻 Usage

### For Students

#### Starting an Exam
1. Click "Start Practice Exam" on the home page
2. Select 4 subjects from the available options
3. Click "Start Exam" button (enabled after selecting 4 subjects)

#### During the Exam
- **Navigate Questions**: Click question numbers (1-40) in the sidebar
- **Answer Questions**: Click on any option (A, B, C, or D)
- **Switch Subjects**: Click subject tabs at the top of sidebar
- **Use Calculator**: Click calculator icon in header
- **Check Time**: Timer is always visible in the header
- **Submit Early**: Click "Submit Exam" button in sidebar

#### Question Grid Colors
- 🔵 **Blue (Active)** - Currently viewing this question
- 🟢 **Green** - Question has been answered
- ⚪ **White** - Question not yet answered

#### Timer Warnings
- ⏱️ **Green** - More than 5 minutes remaining
- 🟡 **Yellow** - Less than 5 minutes remaining (starts blinking)
- 🔴 **Auto-submit** - Exam submits automatically at 00:00:00

### For Developers

#### Adding More Questions

Edit `questions.json` to add questions. Format:

```json
{
  "subject_name": [
    {
      "question": "Your question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0
    }
  ]
}
```

**Note**: `correct` is the index (0-3) of the correct option.

#### Customizing Timer Duration

In `exam.js`, line 7:
```javascript
let timeRemaining = 120 * 60; // 120 minutes in seconds
```

Change `120` to desired minutes.

#### Modifying Color Scheme

In `styles.css`, `:root` section:
```css
:root {
    --primary: #6366f1;      /* Main brand color */
    --secondary: #8b5cf6;    /* Secondary brand color */
    --accent: #ec4899;       /* Accent highlights */
    /* ... */
}
```

#### Dark Mode Colors

In `styles.css`, `[data-theme="dark"]` section:
```css
[data-theme="dark"] {
    --bg-primary: #0f172a;   /* Dark background */
    --text-primary: #f1f5f9; /* Light text */
    /* ... */
}
```

---

## 🎨 Design Philosophy

### Color Psychology
- **Purple/Indigo** - Creativity, wisdom, and focus
- **Pink Accents** - Energy and enthusiasm
- **Green Success** - Achievement and progress
- **Clean White/Dark** - Clarity and concentration

### User Experience
- **Minimal Clicks** - Direct access to all functions
- **Visual Feedback** - Instant response to all actions
- **Clear Navigation** - Intuitive subject and question switching
- **Progress Visibility** - Always know where you are in the exam

### Teenager-Friendly
- Modern gradient aesthetics
- Smooth animations and transitions
- Clean, uncluttered interface
- Mobile-first responsive design

---

## 📊 Technical Details

### Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks or dependencies
- **JSON** - Question data storage
- **LocalStorage** - Theme preference persistence
- **SessionStorage** - Exam state management

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Performance
- **Load Time**: < 1 second
- **Memory Usage**: < 50MB
- **No External Dependencies**: All code is self-contained
- **Offline Capable**: Works without internet after first load

---

## 📝 Question Database

### Current Database
- **Total Questions**: 320 (40 per subject × 8 subjects)
- **Question Types**: Multiple choice (4 options)
- **Difficulty**: Mixed (Easy, Medium, Hard)

### Question Format
Each question includes:
- Question text
- 4 multiple choice options
- Correct answer index (0-3)

### Expanding the Database
To add more questions:

1. Open `questions.json`
2. Add questions to the appropriate subject array
3. Maintain the format:
   ```json
   {
     "question": "Question text?",
     "options": ["A", "B", "C", "D"],
     "correct": 0
   }
   ```
4. Save and refresh

**Recommended**: 40+ questions per subject for variety

---

## 🔧 Troubleshooting

### Common Issues

#### Exam Won't Start
- **Solution**: Ensure exactly 4 subjects are selected
- Check browser console for errors (F12)

#### Questions Not Loading
- **Solution**: Verify `questions.json` is in the same folder
- Check JSON syntax is valid (use JSONLint.com)

#### Timer Not Working
- **Solution**: Ensure JavaScript is enabled in browser
- Check for browser console errors

#### Calculator Not Opening
- **Solution**: Clear browser cache and reload
- Try a different browser

#### Dark Mode Not Saving
- **Solution**: Enable cookies and LocalStorage
- Check browser privacy settings

#### Results Not Displaying
- **Solution**: Complete and submit the exam properly
- Check SessionStorage is enabled

### Browser-Specific Issues

**Safari iOS**
- May need to refresh after theme toggle
- Calculation precision may vary slightly

**Firefox**
- Ensure cookies are not blocked
- Allow LocalStorage in privacy settings

---

## 🎓 Exam Tips (Built into Platform)

1. **Time Management**: Monitor the timer regularly
2. **Answer All Questions**: No penalty for wrong answers
3. **Use the Calculator**: Available for all subjects
4. **Review Flagged Questions**: Use question grid to jump back
5. **Check Before Submit**: Review your answers
6. **Stay Calm**: The interface helps you stay organized

---

## 🤝 Contributing

### How to Contribute

1. **Add Questions**: Submit new questions for any subject
2. **Report Bugs**: Open issues on the repository
3. **Suggest Features**: Propose new functionality
4. **Improve UI**: Design enhancements welcome
5. **Fix Typos**: Documentation improvements appreciated

### Question Contribution Guidelines
- Ensure accuracy of correct answers
- Provide clear, unambiguous questions
- Use proper grammar and spelling
- Include appropriate difficulty level
- Follow existing JSON format

---

## 📜 License

MIT License - Feel free to use, modify, and distribute

---

## 👨‍💻 Development

### Local Development
```bash
# No build process required
# Simply open index.html in a browser

# For live reload (optional)
# Use VS Code Live Server extension
# Or any HTTP server like Python:
python -m http.server 8000
```

### Testing
- Test all subject selections
- Verify timer accuracy
- Check calculator functions
- Test auto-submit at 00:00:00
- Validate results calculations
- Test dark mode persistence
- Verify responsive design

---

## 🗺️ Roadmap

### Future Features (Potential)
- [ ] Score history tracking
- [ ] Performance analytics over time
- [ ] Question explanation mode
- [ ] Study mode (untimed practice)
- [ ] Subject-specific practice
- [ ] Question bookmarking
- [ ] Print results option
- [ ] Share results feature
- [ ] More question banks
- [ ] Difficulty level selection

---

## 📞 Support

For issues, questions, or suggestions:
- Check the Troubleshooting section above
- Review existing issues on the repository
- Open a new issue with detailed description

---

## 🙏 Acknowledgments

- JAMB for the exam format inspiration
- Students preparing for JAMB exams
- Open-source community

---

## 📌 Important Notes

### Data Privacy
- No data is sent to any server
- All data stays in your browser
- No personal information is collected
- SessionStorage is cleared after browser closes

### Disclaimer
This is an **unofficial** practice platform. Not affiliated with or endorsed by JAMB. For official JAMB information, visit [jamb.gov.ng](https://www.jamb.gov.ng)

---

## ⚡ Quick Commands

```bash
# Clone or download the repository
git clone <repository-url>

# Navigate to directory
cd prep

# Open in browser
open index.html        # Mac
start index.html       # Windows
xdg-open index.html    # Linux
```

---

## 📊 Github URL and the Link to the Publish website

https://captaintyborg.github.io/plp-webtechnologies-classroom-july2025-july-2025-final-project-and-deployment-Final-Project-and-Depl/


## 📊 Project Stats

- **Lines of Code**: ~2,500+
- **Files**: 10
- **Subjects**: 8
- **Questions**: 320 (expandable)
- **Development Time**: Optimized for performance
- **Dependencies**: Zero (vanilla JS)

---

**Made with ❤️ for JAMB candidates**

*Practice makes perfect. Excel in your JAMB exam!*
