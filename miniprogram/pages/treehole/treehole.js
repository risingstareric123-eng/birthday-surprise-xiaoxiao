const MEMORY_KEY = 'love-tree-hole-memories'
const COMPLAINT_KEY = 'love-tree-hole-complaints'

Page({
  data: {
    activeTab: 'memory',
    moods: ['难过', '委屈', '生气', '失望', '焦虑'],
    moodIndex: -1,
    memoryForm: {
      title: '',
      content: ''
    },
    complaintForm: {
      title: '',
      content: '',
      mood: ''
    },
    memoryList: [],
    complaintList: []
  },

  onShow() {
    this.renderLists()
  },

  openMemory() {
    this.setData({ activeTab: 'memory' })
  },

  openComplaint() {
    this.setData({ activeTab: 'complaint' })
  },

  onMemoryInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [`memoryForm.${field}`]: e.detail.value
    })
  },

  onComplaintInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [`complaintForm.${field}`]: e.detail.value
    })
  },

  onMoodChange(e) {
    const moodIndex = Number(e.detail.value)
    this.setData({
      moodIndex,
      'complaintForm.mood': this.data.moods[moodIndex]
    })
  },

  submitMemory() {
    const item = {
      title: this.data.memoryForm.title.trim(),
      content: this.data.memoryForm.content.trim(),
      time: this.nowText()
    }

    if (!item.title || !item.content) {
      wx.showToast({ title: '请填写完整', icon: 'none' })
      return
    }

    const old = this.getList(MEMORY_KEY)
    old.unshift(item)
    wx.setStorageSync(MEMORY_KEY, old)

    this.setData({
      memoryForm: { title: '', content: '' }
    })
    this.renderLists()
    wx.showToast({ title: '回忆已保存', icon: 'success' })
  },

  submitComplaint() {
    const item = {
      title: this.data.complaintForm.title.trim(),
      content: this.data.complaintForm.content.trim(),
      mood: this.data.complaintForm.mood,
      time: this.nowText()
    }

    if (!item.title || !item.content || !item.mood) {
      wx.showToast({ title: '请填写完整', icon: 'none' })
      return
    }

    const old = this.getList(COMPLAINT_KEY)
    old.unshift(item)
    wx.setStorageSync(COMPLAINT_KEY, old)

    this.setData({
      moodIndex: -1,
      complaintForm: { title: '', content: '', mood: '' }
    })
    this.renderLists()
    wx.showToast({ title: '诉说已保存', icon: 'success' })
  },

  clearMemory() {
    wx.removeStorageSync(MEMORY_KEY)
    this.renderLists()
    wx.showToast({ title: '已清空回忆', icon: 'none' })
  },

  clearComplaint() {
    wx.removeStorageSync(COMPLAINT_KEY)
    this.renderLists()
    wx.showToast({ title: '已清空诉说', icon: 'none' })
  },

  renderLists() {
    this.setData({
      memoryList: this.getList(MEMORY_KEY),
      complaintList: this.getList(COMPLAINT_KEY)
    })
  },

  getList(key) {
    const data = wx.getStorageSync(key)
    return Array.isArray(data) ? data : []
  },

  nowText() {
    const d = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  }
})
